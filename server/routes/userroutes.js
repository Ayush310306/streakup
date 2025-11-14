// // import express from 'express';
// // import { userAuth } from '../middleware/userAuth.js';
// // import {getUserData} from '../controllers/usercontroller.js';

// // const userRouter = express.Router();

// // userRouter.get('/data', userAuth, getUserData);

// // export default userRouter;

// // Example: .../routes/userroutes.js

// import express from 'express';
// import User from '../models/User.js';
// import userAuth from '../middleware/userAuth.js'; // Assuming you have this middleware

// const router = express.Router();

// // GET current user's points
// router.get('/points', userAuth, async (req, res) => {
//     try {
//         const user = await User.findById(req.userId).select('totalPoints');

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         res.status(200).json({ success: true, totalPoints: user.totalPoints });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// export default router;

// // ❗ NOTE: Is route ko aapko apne main server file (server.js/app.js) mein register karna hoga:
// // app.use('/api/user', userRoutes);

// import express from 'express';
// import User from '../User.js';
// import { userAuth } from '../middleware/userAuth.js'; // Corrected import (with curly braces if it’s a named export)
// import { getUserData } from '../controllers/usercontroller.js'; // Restored old functionality

// const router = express.Router();

// // 🔹 Route 1: Get current logged-in user data (used on homepage for Join Now logic)
// router.get('/data', userAuth, getUserData);

// // 🔹 Route 2: Get user's total points (used on Habits page for progress bar or stats)
// router.get('/points', userAuth, async (req, res) => {
//     try {
//         const user = await User.findById(req.userId).select('totalPoints');

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         res.status(200).json({ success: true, totalPoints: user.totalPoints });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// export default router;
import express from 'express';
import Habit from '../models/Habit.js';
import usermodal from '../models/usermodal.js'; // ✅ Fixed - was User.js
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/usercontroller.js';
const router = express.Router();

router.get('/data', userAuth, getUserData);
// Helper to format a date to 'YYYY-MM-DD'
const formatDate = (date) => date.toISOString().split('T')[0];

// Helper function to calculate points for a given streak length
const calculatePointsForStreak = (streak) => {
    if (streak <= 0) return 0;
    
    let totalPoints = 0;

    // Start by calculating points for streak day 1 (which is 5 points)
    if (streak >= 1) {
        totalPoints += 5;
    }

    // Now calculate points for streak days 2 up to the current streak length
    for (let currentDay = 2; currentDay <= streak; currentDay++) {
        let dailyPoints = 10;
        dailyPoints += Math.floor(currentDay / 5) * 5;
        totalPoints += dailyPoints;
    }

    return totalPoints;
};

// GET all habits for logged-in user
router.get('/', userAuth, async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.userId });

        const today = formatDate(new Date());
        
        const habitsWithCompletionStatus = habits.map(habit => {
            const isCompletedToday = habit.completionHistory.includes(today);
            const totalPointsEarnedForStreak = calculatePointsForStreak(habit.streak);

            return {
                ...habit.toObject(),
                isCompleted: isCompletedToday,
                totalPointsEarnedForStreak: totalPointsEarnedForStreak
            };
        });

        res.status(200).json({ success: true, habits: habitsWithCompletionStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error fetching habits' });
    }
});

// POST add a new habit
router.post('/add', userAuth, async (req, res) => {
    try {
        const { title, category, targetFrequency, websiteLink } = req.body; 

        const habit = new Habit({
            userId: req.userId,
            title,
            category,
            targetFrequency, 
            websiteLink: websiteLink || undefined, 
            streak: 0,
            completionHistory: []
        });

        await habit.save();
        res.status(201).json({ success: true, habit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error adding habit' });
    }
});

// PATCH mark habit as completed (Includes Streak and POINTS Logic)
router.patch('/complete/:id', userAuth, async (req, res) => {
    const habitId = req.params.id;
    const now = new Date();
    const today = formatDate(now);
    
    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = formatDate(yesterdayDate);

    try {
        const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

        if (!habit) {
            return res.status(404).json({ success: false, message: "Habit not found" });
        }

        if (habit.completionHistory.includes(today)) {
            return res.status(400).json({ success: false, message: "Habit already completed today." });
        }

        let newStreak = habit.streak;
        let pointsAwarded = 0; 
        
        if (habit.completionHistory.includes(yesterday)) {
            newStreak += 1;
            pointsAwarded = 10 + Math.floor(newStreak / 5) * 5; 
            console.log(`Streak extended to ${newStreak}. Awarding ${pointsAwarded} points.`);
        } else {
            newStreak = 1;
            pointsAwarded = 5;
            console.log(`New streak started. Awarding ${pointsAwarded} points.`);
        }

        habit.completionHistory.push(today);
        habit.streak = newStreak;
        await habit.save();

        // ✅ Fixed - using usermodal instead of User
        if (pointsAwarded > 0) {
            await usermodal.findByIdAndUpdate(
                req.userId, 
                { $inc: { totalPoints: pointsAwarded } }
            );
        }

        const totalPointsEarnedForStreak = calculatePointsForStreak(newStreak);

        res.status(200).json({ 
            success: true, 
            habit: { 
                ...habit.toObject(), 
                isCompleted: true, 
                totalPointsEarnedForStreak: totalPointsEarnedForStreak
            },
            pointsAwarded 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error completing habit' });
    }
});

// DELETE a habit
router.delete('/:id', userAuth, async (req, res) => {
    const habitId = req.params.id;

    try {
        const deletedHabit = await Habit.findOneAndDelete({ _id: habitId, userId: req.userId });

        if (!deletedHabit) {
            return res.status(404).json({ success: false, message: 'Habit not found' });
        }

        res.status(200).json({ success: true, habit: deletedHabit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error deleting habit' });
    }
});

router.get('/points', userAuth, async (req, res) => {
    try {
        const user = await usermodal.findById(req.userId).select('totalPoints'); // ✅ Fixed

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, totalPoints: user.totalPoints || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
export default router;