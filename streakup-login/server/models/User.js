// Example: .../models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // ... aapke existing fields jaise:
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // ⚡ NEW FIELD: Points ke liye
    totalPoints: { 
        type: Number, 
        default: 0 
    },
    
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);