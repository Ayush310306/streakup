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

import express from 'express';
import User from '../models/User.js';
import { userAuth } from '../middleware/userAuth.js'; // Corrected import (with curly braces if it’s a named export)
import { getUserData } from '../controllers/usercontroller.js'; // Restored old functionality

const router = express.Router();

// 🔹 Route 1: Get current logged-in user data (used on homepage for Join Now logic)
router.get('/data', userAuth, getUserData);

// 🔹 Route 2: Get user's total points (used on Habits page for progress bar or stats)
router.get('/points', userAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('totalPoints');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, totalPoints: user.totalPoints });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
