// // // // // // // // // import express from 'express';
// // // // // // // // // import Habit from '../models/Habit.js';
// // // // // // // // // import userAuth from '../middleware/userAuth.js';

// // // // // // // // // const router = express.Router();

// // // // // // // // // // GET all habits for logged-in user
// // // // // // // // // router.get('/', userAuth, async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const habits = await Habit.find({ userId: req.userId });
// // // // // // // // //     res.status(200).json(habits);
// // // // // // // // //   } catch (err) {
// // // // // // // // //     res.status(500).json({ message: 'Server error', error: err.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // POST add habit
// // // // // // // // // router.post('/add', userAuth, async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const { title, category } = req.body;
// // // // // // // // //     const habit = new Habit({ userId: req.userId, title, category });
// // // // // // // // //     await habit.save();
// // // // // // // // //     res.status(201).json(habit);
// // // // // // // // //   } catch (err) {
// // // // // // // // //     res.status(500).json({ message: 'Server error', error: err.message });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // export default router;
// // // // // // // // import express from 'express';
// // // // // // // // const router = express.Router();

// // // // // // // // import Habit from '../models/Habit.js';        // Habit model
// // // // // // // // import userAuth from '../middleware/userAuth.js';  // Auth middleware

// // // // // // // // // GET all habits for logged-in user
// // // // // // // // router.get('/', userAuth, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const habits = await Habit.find({ userId: req.userId });
// // // // // // // //     res.status(200).json({ success: true, habits });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error(err);
// // // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // POST add a new habit
// // // // // // // // router.post('/add', userAuth, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { title, category } = req.body;

// // // // // // // //     const habit = new Habit({
// // // // // // // //       userId: req.userId,  // user ID from userAuth middleware
// // // // // // // //       title,
// // // // // // // //       category
// // // // // // // //     });

// // // // // // // //     await habit.save();
// // // // // // // //     res.status(201).json({ success: true, habit });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error(err);
// // // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // export default router;
// // // // // // // // import express from 'express';
// // // // // // // // const router = express.Router();

// // // // // // // // import Habit from '../models/Habit.js';        // Habit model
// // // // // // // // import userAuth from '../middleware/userAuth.js';  // Auth middleware

// // // // // // // // // GET all habits for logged-in user
// // // // // // // // router.get('/', userAuth, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const habits = await Habit.find({ userId: req.userId });
// // // // // // // //     res.status(200).json({ success: true, habits });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error(err);
// // // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // POST add a new habit
// // // // // // // // router.post('/add', userAuth, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { title, category } = req.body;

// // // // // // // //     const habit = new Habit({
// // // // // // // //       userId: req.userId,  // user ID from userAuth middleware
// // // // // // // //       title,
// // // // // // // //       category
// // // // // // // //     });

// // // // // // // //     await habit.save();
// // // // // // // //     res.status(201).json({ success: true, habit });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error(err);
// // // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // ✅ PATCH mark habit as completed
// // // // // // // // router.patch('/complete/:id', userAuth, async (req, res) => {
// // // // // // // //   const habitId = req.params.id;

// // // // // // // //   try {
// // // // // // // //     // Find the habit belonging to the logged-in user
// // // // // // // //     const habit = await Habit.findOneAndUpdate(
// // // // // // // //       { _id: habitId, userId: req.userId },
// // // // // // // //       { $set: { isCompleted: true, completedAt: new Date() } },
// // // // // // // //       { new: true }
// // // // // // // //     );

// // // // // // // //     if (!habit) {
// // // // // // // //       return res.status(404).json({ success: false, message: "Habit not found" });
// // // // // // // //     }

// // // // // // // //     res.status(200).json({ success: true, habit });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error(err);
// // // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // export default router;
// // // // // // // import express from 'express';
// // // // // // // const router = express.Router();

// // // // // // // import Habit from '../models/Habit.js';        // Habit model
// // // // // // // import userAuth from '../middleware/userAuth.js';  // Auth middleware

// // // // // // // // GET all habits for logged-in user
// // // // // // // router.get('/', userAuth, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const habits = await Habit.find({ userId: req.userId });
// // // // // // //     res.status(200).json({ success: true, habits });
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // POST add a new habit
// // // // // // // router.post('/add', userAuth, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { title, category } = req.body;

// // // // // // //     const habit = new Habit({
// // // // // // //       userId: req.userId,  // user ID from userAuth middleware
// // // // // // //       title,
// // // // // // //       category
// // // // // // //     });

// // // // // // //     await habit.save();
// // // // // // //     res.status(201).json({ success: true, habit });
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // PATCH mark habit as completed
// // // // // // // router.patch('/complete/:id', userAuth, async (req, res) => {
// // // // // // //   const habitId = req.params.id;

// // // // // // //   try {
// // // // // // //     // Find the habit belonging to the logged-in user
// // // // // // //     const habit = await Habit.findOne({ _id: habitId, userId: req.userId });
// // // // // // //     if (!habit) return res.status(404).json({ success: false, message: 'Habit not found' });

// // // // // // //     // Increment streak
// // // // // // //     habit.streak = (habit.streak || 0) + 1;
// // // // // // //     habit.isCompleted = true; // optional: store completion flag
// // // // // // //     habit.completedAt = new Date(); // store completion date
// // // // // // //     await habit.save();

// // // // // // //     res.status(200).json({ success: true, habit });
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // DELETE a habit
// // // // // // // router.delete('/:id', userAuth, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const habit = await Habit.findById(req.params.id);
// // // // // // //     if (!habit) return res.status(404).json({ success: false, message: 'Habit not found' });

// // // // // // //     // Ensure user owns the habit
// // // // // // //     if (habit.userId.toString() !== req.userId) {
// // // // // // //       return res.status(403).json({ success: false, message: 'Not authorized' });
// // // // // // //     }

// // // // // // //     await habit.deleteOne();
// // // // // // //     res.status(200).json({ success: true, message: 'Habit deleted successfully' });
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // // //   }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import express from 'express';
// // // // // // const router = express.Router();

// // // // // // import Habit from '../models/Habit.js';        // Habit model
// // // // // // import userAuth from '../middleware/userAuth.js';  // Auth middleware

// // // // // // // =======================
// // // // // // // GET all habits for logged-in user
// // // // // // // =======================
// // // // // // router.get('/', userAuth, async (req, res) => {
// // // // // //   try {
// // // // // //     const habits = await Habit.find({ userId: req.userId });
// // // // // //     res.status(200).json({ success: true, habits });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // //   }
// // // // // // });

// // // // // // // =======================
// // // // // // // POST add a new habit
// // // // // // // =======================
// // // // // // router.post('/add', userAuth, async (req, res) => {
// // // // // //   try {
// // // // // //     const { title, category } = req.body;

// // // // // //     const habit = new Habit({
// // // // // //       userId: req.userId,  // user ID from userAuth middleware
// // // // // //       title,
// // // // // //       category
// // // // // //     });

// // // // // //     await habit.save();
// // // // // //     res.status(201).json({ success: true, habit });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // //   }
// // // // // // });

// // // // // // // =======================
// // // // // // // PATCH mark habit as completed
// // // // // // // =======================
// // // // // // router.patch('/complete/:id', userAuth, async (req, res) => {
// // // // // //   const habitId = req.params.id;

// // // // // //   try {
// // // // // //     const habit = await Habit.findOneAndUpdate(
// // // // // //       { _id: habitId, userId: req.userId },
// // // // // //       { $set: { isCompleted: true, completedAt: new Date() } },
// // // // // //       { new: true }
// // // // // //     );

// // // // // //     if (!habit) {
// // // // // //       return res.status(404).json({ success: false, message: "Habit not found" });
// // // // // //     }

// // // // // //     res.status(200).json({ success: true, habit });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // //   }
// // // // // // });

// // // // // // // =======================
// // // // // // // DELETE a habit
// // // // // // // =======================
// // // // // // router.delete('/:id', userAuth, async (req, res) => {
// // // // // //   const habitId = req.params.id;

// // // // // //   try {
// // // // // //     const habit = await Habit.findOneAndDelete({ _id: habitId, userId: req.userId });

// // // // // //     if (!habit) {
// // // // // //       return res.status(404).json({ success: false, message: "Habit not found" });
// // // // // //     }

// // // // // //     res.status(200).json({ success: true, message: "Habit deleted successfully" });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // // //   }
// // // // // // });

// // // // // // export default router;
// // // // // import express from 'express';
// // // // // const router = express.Router();

// // // // // import Habit from '../models/Habit.js';        // Habit model
// // // // // import userAuth from '../middleware/userAuth.js';  // Auth middleware

// // // // // // GET all habits for logged-in user
// // // // // router.get('/', userAuth, async (req, res) => {
// // // // //   try {
// // // // //     const habits = await Habit.find({ userId: req.userId });
// // // // //     res.status(200).json({ success: true, habits });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // POST add a new habit
// // // // // router.post('/add', userAuth, async (req, res) => {
// // // // //   try {
// // // // //     const { title, category } = req.body;

// // // // //     const habit = new Habit({
// // // // //       userId: req.userId,  // user ID from userAuth middleware
// // // // //       title,
// // // // //       category
// // // // //     });

// // // // //     await habit.save();
// // // // //     res.status(201).json({ success: true, habit });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // PATCH mark habit as completed
// // // // // router.patch('/complete/:id', userAuth, async (req, res) => {
// // // // //   const habitId = req.params.id;

// // // // //   try {
// // // // //     const habit = await Habit.findOneAndUpdate(
// // // // //       { _id: habitId, userId: req.userId },
// // // // //       { $set: { isCompleted: true, completedAt: new Date() } },
// // // // //       { new: true }
// // // // //     );

// // // // //     if (!habit) {
// // // // //       return res.status(404).json({ success: false, message: "Habit not found" });
// // // // //     }

// // // // //     res.status(200).json({ success: true, habit });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // DELETE a habit
// // // // // router.delete('/:id', userAuth, async (req, res) => {
// // // // //   const habitId = req.params.id;

// // // // //   try {
// // // // //     const deletedHabit = await Habit.findOneAndDelete({ _id: habitId, userId: req.userId });

// // // // //     if (!deletedHabit) {
// // // // //       return res.status(404).json({ success: false, message: 'Habit not found' });
// // // // //     }

// // // // //     res.status(200).json({ success: true, habit: deletedHabit });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // export default router;
// // // // // import express from 'express';
// // // // // import Habit from '../models/Habit.js';
// // // // // import userAuth from '../middleware/userAuth.js';

// // // // // const router = express.Router();

// // // // // // Helper to format a date to 'YYYY-MM-DD'
// // // // // const formatDate = (date) => date.toISOString().split('T')[0];

// // // // // // GET all habits for logged-in user
// // // // // router.get('/', userAuth, async (req, res) => {
// // // // //   try {
// // // // //     const habits = await Habit.find({ userId: req.userId });

// // // // //     // The frontend logic handles checking completion history, 
// // // // //     // but the backend structure is fine. The frontend will use completionHistory to set isCompleted.
// // // // //     const today = formatDate(new Date());
// // // // //     const habitsWithCompletionStatus = habits.map(habit => {
// // // // //         const isCompletedToday = habit.completionHistory.includes(today);
// // // // //         return {
// // // // //             ...habit.toObject(),
// // // // //             isCompleted: isCompletedToday // Attach the current day status for the UI
// // // // //         };
// // // // //     });

// // // // //     res.status(200).json({ success: true, habits: habitsWithCompletionStatus });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // POST add a new habit
// // // // // router.post('/add', userAuth, async (req, res) => {
// // // // //   try {
// // // // //     const { title, category } = req.body;

// // // // //     const habit = new Habit({
// // // // //       userId: req.userId,
// // // // //       title,
// // // // //       category,
// // // // //       streak: 0,
// // // // //       completionHistory: []
// // // // //     });

// // // // //     await habit.save();
// // // // //     res.status(201).json({ success: true, habit });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // PATCH mark habit as completed (Streak and History Logic)
// // // // // router.patch('/complete/:id', userAuth, async (req, res) => {
// // // // //   const habitId = req.params.id;
// // // // //   const now = new Date();
// // // // //   const today = formatDate(now);
  
// // // // //   // Calculate yesterday's date for streak checking
// // // // //   const yesterdayDate = new Date(now);
// // // // //   yesterdayDate.setDate(yesterdayDate.getDate() - 1);
// // // // //   const yesterday = formatDate(yesterdayDate);

// // // // //   try {
// // // // //     const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

// // // // //     if (!habit) {
// // // // //       return res.status(404).json({ success: false, message: "Habit not found" });
// // // // //     }

// // // // //     // 1. Check if already completed today
// // // // //     if (habit.completionHistory.includes(today)) {
// // // // //       return res.status(400).json({ success: false, message: "Habit already completed today. Try again tomorrow!" });
// // // // //     }

// // // // //     // 2. Update streak
// // // // //     let newStreak = habit.streak;
    
// // // // //     // Check if it was completed yesterday
// // // // //     if (habit.completionHistory.includes(yesterday)) {
// // // // //         // Continue the streak
// // // // //         newStreak += 1;
// // // // //     } else {
// // // // //         // Start a new streak (was not completed yesterday)
// // // // //         newStreak = 1;
// // // // //     }

// // // // //     // 3. Add today's date to history
// // // // //     habit.completionHistory.push(today);
    
// // // // //     // 4. Save updates
// // // // //     habit.streak = newStreak;
// // // // //     habit.isCompleted = true; // Set current day status
// // // // //     habit.completedAt = new Date();
// // // // //     await habit.save();

// // // // //     res.status(200).json({ 
// // // // //         success: true, 
// // // // //         habit: habit.toObject(), // Return the updated habit object
// // // // //         isCompleted: true
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // DELETE a habit
// // // // // router.delete('/:id', userAuth, async (req, res) => {
// // // // //   const habitId = req.params.id;

// // // // //   try {
// // // // //     const deletedHabit = await Habit.findOneAndDelete({ _id: habitId, userId: req.userId });

// // // // //     if (!deletedHabit) {
// // // // //       return res.status(404).json({ success: false, message: 'Habit not found' });
// // // // //     }

// // // // //     res.status(200).json({ success: true, habit: deletedHabit });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // export default router;

// // // // import express from 'express';
// // // // import Habit from '../models/Habit.js';
// // // // import userAuth from '../middleware/userAuth.js';

// // // // const router = express.Router();

// // // // // Helper to format a date to 'YYYY-MM-DD'
// // // // const formatDate = (date) => date.toISOString().split('T')[0];

// // // // // GET all habits for logged-in user
// // // // router.get('/', userAuth, async (req, res) => {
// // // //   try {
// // // //     const habits = await Habit.find({ userId: req.userId });

// // // //     // The frontend logic handles checking completion history, 
// // // //     // but the backend structure is fine. The frontend will use completionHistory to set isCompleted.
// // // //     const today = formatDate(new Date());
// // // //     const habitsWithCompletionStatus = habits.map(habit => {
// // // //         const isCompletedToday = habit.completionHistory.includes(today);
// // // //         return {
// // // //             ...habit.toObject(),
// // // //             isCompleted: isCompletedToday // Attach the current day status for the UI
// // // //         };
// // // //     });

// // // //     res.status(200).json({ success: true, habits: habitsWithCompletionStatus });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // //   }
// // // // });

// // // // // POST add a new habit (MODIFIED to include targetFrequency)
// // // // router.post('/add', userAuth, async (req, res) => {
// // // //   try {
// // // //     // ⚡ MODIFIED: Extract targetFrequency from the request body
// // // //     const { title, category, targetFrequency } = req.body; 

// // // //     const habit = new Habit({
// // // //       userId: req.userId,
// // // //       title,
// // // //       category,
// // // //       // ⚡ Add targetFrequency. Mongoose will use the default if not provided.
// // // //       targetFrequency, 
// // // //       streak: 0,
// // // //       completionHistory: []
// // // //     });

// // // //     await habit.save();
// // // //     res.status(201).json({ success: true, habit });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // //   }
// // // // });

// // // // // PATCH mark habit as completed (Streak and History Logic)
// // // // router.patch('/complete/:id', userAuth, async (req, res) => {
// // // //   const habitId = req.params.id;
// // // //   const now = new Date();
// // // //   const today = formatDate(now);
  
// // // //   // Calculate yesterday's date for streak checking
// // // //   const yesterdayDate = new Date(now);
// // // //   yesterdayDate.setDate(yesterdayDate.getDate() - 1);
// // // //   const yesterday = formatDate(yesterdayDate);

// // // //   try {
// // // //     const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

// // // //     if (!habit) {
// // // //       return res.status(404).json({ success: false, message: "Habit not found" });
// // // //     }

// // // //     // 1. Check if already completed today
// // // //     if (habit.completionHistory.includes(today)) {
// // // //       return res.status(400).json({ success: false, message: "Habit already completed today. Try again tomorrow!" });
// // // //     }

// // // //     // 2. Update streak (NOTE: This logic is still based on daily completion. 
// // // //     // To use targetFrequency, you'd need more complex weekly rolling calculations.)
// // // //     let newStreak = habit.streak;
    
// // // //     // Check if it was completed yesterday
// // // //     if (habit.completionHistory.includes(yesterday)) {
// // // //         // Continue the streak
// // // //         newStreak += 1;
// // // //     } else {
// // // //         // Start a new streak (was not completed yesterday)
// // // //         newStreak = 1;
// // // //     }

// // // //     // 3. Add today's date to history
// // // //     habit.completionHistory.push(today);
    
// // // //     // 4. Save updates
// // // //     habit.streak = newStreak;
// // // //     habit.isCompleted = true; // Set current day status
// // // //     habit.completedAt = new Date();
// // // //     await habit.save();

// // // //     res.status(200).json({ 
// // // //         success: true, 
// // // //         habit: habit.toObject(), // Return the updated habit object
// // // //         isCompleted: true
// // // //     });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // //   }
// // // // });

// // // // // DELETE a habit
// // // // router.delete('/:id', userAuth, async (req, res) => {
// // // //   const habitId = req.params.id;

// // // //   try {
// // // //     const deletedHabit = await Habit.findOneAndDelete({ _id: habitId, userId: req.userId });

// // // //     if (!deletedHabit) {
// // // //       return res.status(404).json({ success: false, message: 'Habit not found' });
// // // //     }

// // // //     res.status(200).json({ success: true, habit: deletedHabit });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ success: false, message: 'Server error' });
// // // //   }
// // // // });

// // // // export default router;
// // // import express from 'express';
// // // import Habit from '../models/Habit.js';
// // // import userAuth from '../middleware/userAuth.js';

// // // const router = express.Router();

// // // // Helper to format a date to 'YYYY-MM-DD'
// // // const formatDate = (date) => date.toISOString().split('T')[0];

// // // // GET all habits for logged-in user (NO CHANGE)
// // // router.get('/', userAuth, async (req, res) => {
// // //   try {
// // //     const habits = await Habit.find({ userId: req.userId });

// // //     const today = formatDate(new Date());
// // //     const habitsWithCompletionStatus = habits.map(habit => {
// // //         const isCompletedToday = habit.completionHistory.includes(today);
// // //         return {
// // //             ...habit.toObject(),
// // //             isCompleted: isCompletedToday
// // //         };
// // //     });

// // //     res.status(200).json({ success: true, habits: habitsWithCompletionStatus });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ success: false, message: 'Server error' });
// // //   }
// // // });

// // // // POST add a new habit (MODIFIED to include websiteLink)
// // // router.post('/add', userAuth, async (req, res) => {
// // //   try {
// // //     // ⚡ MODIFIED: Extract websiteLink from the request body
// // //     const { title, category, targetFrequency, websiteLink } = req.body; 

// // //     const habit = new Habit({
// // //       userId: req.userId,
// // //       title,
// // //       category,
// // //       targetFrequency, 
// // //       // ⚡ Add websiteLink
// // //       websiteLink: websiteLink || undefined, // Use undefined so Mongoose default applies if link is empty
// // //       streak: 0,
// // //       completionHistory: []
// // //     });

// // //     await habit.save();
// // //     res.status(201).json({ success: true, habit });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ success: false, message: 'Server error' });
// // //   }
// // // });

// // // // PATCH mark habit as completed (NO CHANGE)
// // // router.patch('/complete/:id', userAuth, async (req, res) => {
// // // // ... (rest of the PATCH logic remains unchanged) ...
// // //   const habitId = req.params.id;
// // //   const now = new Date();
// // //   const today = formatDate(now);
  
// // //   const yesterdayDate = new Date(now);
// // //   yesterdayDate.setDate(yesterdayDate.getDate() - 1);
// // //   const yesterday = formatDate(yesterdayDate);

// // //   try {
// // //     const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

// // //     if (!habit) {
// // //       return res.status(404).json({ success: false, message: "Habit not found" });
// // //     }

// // //     if (habit.completionHistory.includes(today)) {
// // //       return res.status(400).json({ success: false, message: "Habit already completed today. Try again tomorrow!" });
// // //     }

// // //     let newStreak = habit.streak;
    
// // //     if (habit.completionHistory.includes(yesterday)) {
// // //         newStreak += 1;
// // //     } else {
// // //         newStreak = 1;
// // //     }

// // //     habit.completionHistory.push(today);
    
// // //     habit.streak = newStreak;
// // //     habit.isCompleted = true;
// // //     habit.completedAt = new Date();
// // //     await habit.save();

// // //     res.status(200).json({ 
// // //         success: true, 
// // //         habit: habit.toObject(),
// // //         isCompleted: true
// // //     });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ success: false, message: 'Server error' });
// // //   }
// // // });

// // // // DELETE a habit (NO CHANGE)
// // // router.delete('/:id', userAuth, async (req, res) => {
// // // // ... (rest of the DELETE logic remains unchanged) ...
// // //   const habitId = req.params.id;

// // //   try {
// // //     const deletedHabit = await Habit.findOneAndDelete({ _id: habitId, userId: req.userId });

// // //     if (!deletedHabit) {
// // //       return res.status(404).json({ success: false, message: 'Habit not found' });
// // //     }

// // //     res.status(200).json({ success: true, habit: deletedHabit });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ success: false, message: 'Server error' });
// // //   }
// // // });

// // // export default router;

// // import express from 'express';
// // import Habit from '../models/Habit.js';
// // // ⚡ IMPORTANT: Ensure you have an actual User model in your project 
// // // and import it here. Assuming '../models/User.js'
// // import User from '../models/User.js'; 
// // import userAuth from '../middleware/userAuth.js';

// // const router = express.Router();

// // // Helper to format a date to 'YYYY-MM-DD'
// // const formatDate = (date) => date.toISOString().split('T')[0];

// // // GET all habits for logged-in user (NO CHANGE)
// // router.get('/', userAuth, async (req, res) => {
// //   try {
// //     const habits = await Habit.find({ userId: req.userId });

// //     const today = formatDate(new Date());
// //     const habitsWithCompletionStatus = habits.map(habit => {
// //         const isCompletedToday = habit.completionHistory.includes(today);
// //         return {
// //             ...habit.toObject(),
// //             isCompleted: isCompletedToday
// //         };
// //     });

// //     res.status(200).json({ success: true, habits: habitsWithCompletionStatus });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });

// // // POST add a new habit (NO CHANGE)
// // router.post('/add', userAuth, async (req, res) => {
// //   try {
// //     const { title, category, targetFrequency, websiteLink } = req.body; 

// //     const habit = new Habit({
// //       userId: req.userId,
// //       title,
// //       category,
// //       targetFrequency, 
// //       websiteLink: websiteLink || undefined, 
// //       streak: 0,
// //       completionHistory: []
// //     });

// //     await habit.save();
// //     res.status(201).json({ success: true, habit });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });

// // // PATCH mark habit as completed (MODIFIED: Streak, History, and POINTS Logic)
// // router.patch('/complete/:id', userAuth, async (req, res) => {
// //   const habitId = req.params.id;
// //   const now = new Date();
// //   const today = formatDate(now);
  
// //   // Calculate yesterday's date for streak checking
// //   const yesterdayDate = new Date(now);
// //   yesterdayDate.setDate(yesterdayDate.getDate() - 1);
// //   const yesterday = formatDate(yesterdayDate);

// //   try {
// //     const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

// //     if (!habit) {
// //       return res.status(404).json({ success: false, message: "Habit not found" });
// //     }

// //     // 1. Check if already completed today
// //     if (habit.completionHistory.includes(today)) {
// //       return res.status(400).json({ success: false, message: "Habit already completed today. Try again tomorrow!" });
// //     }

// //     // 2. Update streak and calculate points
// //     let newStreak = habit.streak;
// //     let pointsAwarded = 0; 
    
// //     // Streak Extension Check (Daily Logic)
// //     if (habit.completionHistory.includes(yesterday)) {
// //         // Continue the streak
// //         newStreak += 1;
        
// //         // ⚡ POINTS CALCULATION: Award 10 points + 5 bonus points for every 5 days achieved
// //         pointsAwarded = 10 + Math.floor(newStreak / 5) * 5; 
        
// //         console.log(`Streak extended to ${newStreak}. Awarding ${pointsAwarded} points.`);
// //     } else {
// //         // Start a new streak
// //         newStreak = 1;
// //         pointsAwarded = 5; // Base points for completing the day
// //         console.log(`New streak started. Awarding ${pointsAwarded} points.`);
// //     }

// //     // 3. Add today's date to history
// //     habit.completionHistory.push(today);
    
// //     // 4. Save habit updates
// //     habit.streak = newStreak;
// //     habit.isCompleted = true; 
// //     habit.completedAt = new Date();
// //     await habit.save();

// //     // ⚡ Update User's total points in the User Model
// //     if (pointsAwarded > 0) {
// //         // Use findByIdAndUpdate with $inc (increment) for atomic update
// //         await User.findByIdAndUpdate(
// //             req.userId, 
// //             { $inc: { totalPoints: pointsAwarded } }
// //         );
// //     }

// //     res.status(200).json({ 
// //         success: true, 
// //         habit: habit.toObject(),
// //         isCompleted: true,
// //         pointsAwarded // Send awarded points back to the frontend for a pop-up
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });

// // // DELETE a habit (NO CHANGE)
// // router.delete('/:id', userAuth, async (req, res) => {
// //   const habitId = req.params.id;

// //   try {
// //     const deletedHabit = await Habit.findOneAndDelete({ _id: habitId, userId: req.userId });

// //     if (!deletedHabit) {
// //       return res.status(404).json({ success: false, message: 'Habit not found' });
// //     }

// //     res.status(200).json({ success: true, habit: deletedHabit });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });

// // export default router;

// import express from 'express';
// import Habit from '../models/Habit.js';
// import User from '../models/User.js'; // Must import User model for point updates
// import userAuth from '../middleware/userAuth.js';

// const router = express.Router();

// // Helper to format a date to 'YYYY-MM-DD'
// const formatDate = (date) => date.toISOString().split('T')[0];

// // GET all habits for logged-in user
// router.get('/', userAuth, async (req, res) => {
//     try {
//         const habits = await Habit.find({ userId: req.userId });

//         const today = formatDate(new Date());
//         const habitsWithCompletionStatus = habits.map(habit => {
//             const isCompletedToday = habit.completionHistory.includes(today);
//             return {
//                 ...habit.toObject(),
//                 isCompleted: isCompletedToday
//             };
//         });

//         res.status(200).json({ success: true, habits: habitsWithCompletionStatus });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error fetching habits' });
//     }
// });

// // POST add a new habit
// router.post('/add', userAuth, async (req, res) => {
//     try {
//         const { title, category, targetFrequency, websiteLink } = req.body; 

//         const habit = new Habit({
//             userId: req.userId,
//             title,
//             category,
//             targetFrequency, 
//             websiteLink: websiteLink || undefined, 
//             streak: 0,
//             completionHistory: []
//         });

//         await habit.save();
//         res.status(201).json({ success: true, habit });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error adding habit' });
//     }
// });

// // PATCH mark habit as completed (Includes Streak and POINTS Logic)
// router.patch('/complete/:id', userAuth, async (req, res) => {
//     const habitId = req.params.id;
//     const now = new Date();
//     const today = formatDate(now);
    
//     // Calculate yesterday's date for streak checking
//     const yesterdayDate = new Date(now);
//     yesterdayDate.setDate(yesterdayDate.getDate() - 1);
//     const yesterday = formatDate(yesterdayDate);

//     try {
//         const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

//         if (!habit) {
//             return res.status(404).json({ success: false, message: "Habit not found" });
//         }

//         // 1. Check if already completed today
//         if (habit.completionHistory.includes(today)) {
//             return res.status(400).json({ success: false, message: "Habit already completed today." });
//         }

//         // 2. Update streak and calculate points
//         let newStreak = habit.streak;
//         let pointsAwarded = 0; 
        
//         if (habit.completionHistory.includes(yesterday)) {
//             // Continue the streak
//             newStreak += 1;
            
//             // POINTS CALCULATION: Award 10 points + 5 bonus points for every 5 days achieved
//             pointsAwarded = 10 + Math.floor(newStreak / 5) * 5; 
            
//             console.log(`Streak extended to ${newStreak}. Awarding ${pointsAwarded} points.`);
//         } else {
//             // Start a new streak (either first time or missed a day)
//             newStreak = 1;
//             pointsAwarded = 5; // Base points for completing the day
//             console.log(`New streak started. Awarding ${pointsAwarded} points.`);
//         }

//         // 3. Update Habit document
//         habit.completionHistory.push(today);
//         habit.streak = newStreak;
//         // The frontend will determine isCompleted based on the history, 
//         // but we can set it here for immediate response consistency.
//         // NOTE: The Habit model likely doesn't have an `isCompleted` field, 
//         // but we'll include it if it's there. Removing `habit.isCompleted = true` 
//         // and `habit.completedAt = new Date()` to align with standard Mongoose documents
//         // unless those fields exist in your Habit schema.
//         await habit.save();

//         // 4. Update User's total points in the User Model (Atomic Update)
//         if (pointsAwarded > 0) {
//             await User.findByIdAndUpdate(
//                 req.userId, 
//                 { $inc: { totalPoints: pointsAwarded } }
//             );
//         }

//         // 5. Send response
//         res.status(200).json({ 
//             success: true, 
//             habit: { ...habit.toObject(), isCompleted: true },
//             pointsAwarded 
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error completing habit' });
//     }
// });

// // DELETE a habit
// router.delete('/:id', userAuth, async (req, res) => {
//     const habitId = req.params.id;

//     try {
//         const deletedHabit = await Habit.findOneAndDelete({ _id: habitId, userId: req.userId });

//         if (!deletedHabit) {
//             return res.status(404).json({ success: false, message: 'Habit not found' });
//         }

//         res.status(200).json({ success: true, habit: deletedHabit });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Server error deleting habit' });
//     }
// });

// export default router;
import express from 'express';
import Habit from '../models/Habit.js';
import User from '../models/User.js'; // Must import User model for point updates
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Helper to format a date to 'YYYY-MM-DD'
const formatDate = (date) => date.toISOString().split('T')[0];

// Helper function to calculate points for a given streak length
const calculatePointsForStreak = (streak) => {
    if (streak <= 0) return 0;
    
    // Logic from the PATCH /complete route:
    // Base points for a new streak (streak = 1) is 5.
    // Base points for continuation (streak > 1) is 10 + (5 bonus for every 5 days achieved)
    
    let totalPoints = 0;

    // Start by calculating points for streak day 1 (which is 5 points)
    if (streak >= 1) {
        totalPoints += 5;
    }

    // Now calculate points for streak days 2 up to the current streak length
    // Each day from day 2 onwards is treated as a streak extension completion.
    for (let currentDay = 2; currentDay <= streak; currentDay++) {
        // Base 10 points for completing a streak day
        let dailyPoints = 10;
        
        // Bonus points check (awarded on days 5, 10, 15, etc.)
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
            
            // ⚡ NEW LOGIC: Calculate total points earned based on the current streak
            const totalPointsEarnedForStreak = calculatePointsForStreak(habit.streak);

            return {
                ...habit.toObject(),
                isCompleted: isCompletedToday,
                totalPointsEarnedForStreak: totalPointsEarnedForStreak // ⚡ Include the calculated value
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
    
    // Calculate yesterday's date for streak checking
    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = formatDate(yesterdayDate);

    try {
        const habit = await Habit.findOne({ _id: habitId, userId: req.userId });

        if (!habit) {
            return res.status(404).json({ success: false, message: "Habit not found" });
        }

        // 1. Check if already completed today
        if (habit.completionHistory.includes(today)) {
            return res.status(400).json({ success: false, message: "Habit already completed today." });
        }

        // 2. Update streak and calculate points
        let newStreak = habit.streak;
        let pointsAwarded = 0; 
        
        if (habit.completionHistory.includes(yesterday)) {
            // Continue the streak
            newStreak += 1;
            
            // POINTS CALCULATION: Award 10 points + 5 bonus points for every 5 days achieved
            pointsAwarded = 10 + Math.floor(newStreak / 5) * 5; 
            
            console.log(`Streak extended to ${newStreak}. Awarding ${pointsAwarded} points.`);
        } else {
            // Start a new streak (either first time or missed a day)
            newStreak = 1;
            pointsAwarded = 5; // Base points for completing the day
            console.log(`New streak started. Awarding ${pointsAwarded} points.`);
        }

        // 3. Update Habit document
        habit.completionHistory.push(today);
        habit.streak = newStreak;
        await habit.save();

        // 4. Update User's total points in the User Model (Atomic Update)
        if (pointsAwarded > 0) {
            await User.findByIdAndUpdate(
                req.userId, 
                { $inc: { totalPoints: pointsAwarded } }
            );
        }

        // 5. Calculate the new total points earned for the updated streak
        const totalPointsEarnedForStreak = calculatePointsForStreak(newStreak);

        // 6. Send response
        res.status(200).json({ 
            success: true, 
            habit: { 
                ...habit.toObject(), 
                isCompleted: true, 
                totalPointsEarnedForStreak: totalPointsEarnedForStreak // ⚡ Updated value included
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

export default router;
