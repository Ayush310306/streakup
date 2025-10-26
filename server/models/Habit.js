// // // // // const mongoose = require('mongoose');

// // // // // const habitSchema = new mongoose.Schema({
// // // // //     userId: {
// // // // //         type: mongoose.Schema.Types.ObjectId,
// // // // //         ref: 'User',
// // // // //         required: true
// // // // //     },
// // // // //     title: {
// // // // //         type: String,
// // // // //         required: true
// // // // //     },
// // // // //     category: {
// // // // //         type: String,
// // // // //         enum: ['Fitness', 'Learning', 'Wellness', 'Health'],
// // // // //         default: 'Health'
// // // // //     },
// // // // //     streak: {
// // // // //         type: Number,
// // // // //         default: 0
// // // // //     },
// // // // //     createdAt: {
// // // // //         type: Date,
// // // // //         default: Date.now
// // // // //     }
// // // // // });

// // // // // module.exports = mongoose.model('Habit', habitSchema);
// // // // import mongoose from "mongoose";

// // // // const habitSchema = new mongoose.Schema({
// // // //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // // //   title: { type: String, required: true },
// // // //   category: {
// // // //     type: String,
// // // //     enum: ["Fitness", "Learning", "Wellness", "Health"],
// // // //     default: "Health",
// // // //   },
// // // //   streak: { type: Number, default: 0 },
// // // //   createdAt: { type: Date, default: Date.now },
// // // // });

// // // // export default mongoose.model("Habit", habitSchema);

// // // import mongoose from "mongoose";

// // // const habitSchema = new mongoose.Schema({
// // //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // //   title: { type: String, required: true },
// // //   category: {
// // //     type: String,
// // //     enum: ["Fitness", "Learning", "Wellness", "Health"],
// // //     default: "Health",
// // //   },
// // //   // Stores the current consecutive streak count
// // //   streak: { 
// // //     type: Number, 
// // //     default: 0 
// // //   },
  
// // //   // Array to store completion dates (as 'YYYY-MM-DD' strings)
// // //   completionHistory: {
// // //     type: [String], 
// // //     default: [],
// // //   },

// // //   // Temporary flag for current day UI status (derived from history)
// // //   isCompleted: { 
// // //     type: Boolean, 
// // //     default: false 
// // //   }, 
// // //   completedAt: { 
// // //     type: Date 
// // //   }, 
  
// // //   createdAt: { type: Date, default: Date.now },
// // // });

// // // export default mongoose.model("Habit", habitSchema);
// // import mongoose from "mongoose";

// // const habitSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //   title: { type: String, required: true },
// //   category: {
// //     type: String,
// //     enum: ["Fitness", "Learning", "Wellness", "Health", "Finance", "Creativity", "Social", "Other"],
// //     default: "Health",
// //   },
  
// //   // 🆕 NEW FIELD: Target completions per week (1-7)
// //   targetFrequency: {
// //     type: Number,
// //     min: 1,
// //     max: 7,
// //     default: 7, // Default is Daily
// //   },

// //   streak: { 
// //     type: Number, 
// //     default: 0 
// //   },
  
// //   completionHistory: {
// //     type: [String], 
// //     default: [],
// //   },

// //   isCompleted: { 
// //     type: Boolean, 
// //     default: false 
// //   }, 
// //   completedAt: { 
// //     type: Date 
// //   }, 
  
// //   createdAt: { type: Date, default: Date.now },
// // });

// // export default mongoose.model("Habit", habitSchema);
// import mongoose from "mongoose";

// const habitSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   title: { type: String, required: true },
//   category: {
//     type: String,
//     enum: ["Fitness", "Learning", "Wellness", "Health", "Finance", "Creativity", "Social", "Other"],
//     default: "Health",
//   },
  
//   // ⚡ MODIFIED FIELD: Target frequency stored as a descriptive string
//   targetFrequency: {
//     type: String,
//     default: "7/week", // Default to daily
//   },

//   streak: { 
//     type: Number, 
//     default: 0 
//   },
  
//   completionHistory: {
//     type: [String], 
//     default: [],
//   },

//   isCompleted: { 
//     type: Boolean, 
//     default: false 
//   }, 
//   completedAt: { 
//     type: Date 
//   }, 
  
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Habit", habitSchema);
import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["Fitness", "Learning", "Wellness", "Health", "Finance", "Creativity", "Social", "Other"],
    default: "Health",
  },
  
  targetFrequency: {
    type: String,
    default: "7/week",
  },
  
  // 🆕 NEW FIELD: Optional link for resources related to the habit
  websiteLink: {
    type: String,
    trim: true,
    default: "", // Optional, defaults to empty string
  },

  streak: { 
    type: Number, 
    default: 0 
  },
  
  completionHistory: {
    type: [String], 
    default: [],
  },

  isCompleted: { 
    type: Boolean, 
    default: false 
  }, 
  completedAt: { 
    type: Date 
  }, 
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Habit", habitSchema);