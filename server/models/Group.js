// models/Group.js
import mongoose from "mongoose";

const completionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  doneAt: {
    type: Date,
  },
}, { _id: false });

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  assignedAt: { type: Date, default: Date.now },
  completions: [completionSchema]
}, { _id: false });

const memberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  username: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, trim: true },
  groupCode: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 6,
    index: true
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  members: [memberSchema],
  habits: [habitSchema],
  groupStreak: { type: Number, default: 0 },
  totalGroupPoints: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Group", groupSchema);
