// routes/groupRoutes.js
import express from "express";
import mongoose from "mongoose";
import Group from "../models/Group.js";
import usermodal from "../models/usermodal.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// Generate 6-digit group codes
const generateGroupCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/* ----------------------------------------------------
   LEADERBOARD  (KEEP ABOVE ALL /:groupId ROUTES)
---------------------------------------------------- */
router.get("/leaderboard", async (req, res) => {
  try {
    const groups = await Group.find().lean();

    const leaderboard = groups
      .map((g) => ({
        id: g._id,
        username: g.groupName,         // group ka naam show hoga
        totalPoints: g.totalGroupPoints || 0,
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }))
      .slice(0, 10);

    return res.json({ success: true, leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});



/* ----------------------------------------------------
   DAILY RESET — Safe isolated logic
---------------------------------------------------- */
router.put("/reset-daily", async (req, res) => {
  try {
    const groups = await Group.find();
    const today = new Date().toDateString();

    for (const g of groups) {
      if (g.lastResetDate !== today) {
        // reset daily completions
        g.habits.forEach((h) => {
          h.completions.forEach((c) => {
            c.isDone = false;
            c.doneAt = null;
          });
        });

        // streak continuation
        if (g.yesterdayCompleted === true) {
          g.groupStreak += 1;
        } else {
          g.groupStreak = 0;
        }

        g.todayPoints = 0;
        g.yesterdayCompleted = false;
        g.lastResetDate = today;

        await g.save();
      }
    }

    return res.json({ success: true, message: "Daily reset done!" });
  } catch (err) {
    console.error("Daily reset error:", err);
    return res.status(500).json({ success: false, message: "Reset failed" });
  }
});

/* ----------------------------------------------------
   CREATE GROUP
---------------------------------------------------- */
router.post("/create", userAuth, async (req, res) => {
  try {
    const { groupName } = req.body;
    if (!groupName)
      return res.status(400).json({ success: false, message: "Group name required" });

    const user = await usermodal.findById(req.userId).select("username");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let groupCode = generateGroupCode();
    while (await Group.findOne({ groupCode })) {
      groupCode = generateGroupCode();
    }

    const group = new Group({
      groupName,
      groupCode,
      createdBy: req.userId,
      members: [{ userId: req.userId, username: user.username }],
      
    });

    await group.save();

    return res.json({ success: true, group, message: "Group created!" });
  } catch (err) {
    console.error("Create group error:", err);
    return res.status(500).json({ success: false, message: "Error creating group" });
  }
});

/* ----------------------------------------------------
   JOIN GROUP
---------------------------------------------------- */
router.post("/join", userAuth, async (req, res) => {
  try {
    const { groupCode } = req.body;
    if (!groupCode)
      return res.status(400).json({ success: false, message: "Group code required" });

    const user = await usermodal.findById(req.userId).select("username");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const group = await Group.findOne({ groupCode });
    if (!group)
      return res.status(404).json({ success: false, message: "Invalid group code" });

    if (group.members.some((m) => String(m.userId) === String(req.userId)))
      return res.status(400).json({ success: false, message: "Already in group" });

    group.members.push({ userId: req.userId, username: user.username });

    // Add existing habits to new member
    group.habits.forEach((h) => {
      h.completions.push({
        userId: req.userId,
        isDone: false,
        doneAt: null,
      });
    });

    await group.save();

    return res.json({ success: true, group, message: "Joined group!" });
  } catch (err) {
    console.error("Join group error:", err);
    return res.status(500).json({ success: false, message: "Error joining group" });
  }
});

/* ----------------------------------------------------
   GET MY GROUPS
---------------------------------------------------- */
router.get("/my-groups", userAuth, async (req, res) => {
  try {
    const groups = await Group.find({
      "members.userId": req.userId,
    }).sort({ createdAt: -1 });

    return res.json({ success: true, groups });
  } catch (err) {
    console.error("Get my groups error:", err);
    return res.status(500).json({ success: false });
  }
});

/* ----------------------------------------------------
   ADD HABIT
---------------------------------------------------- */
router.post("/:groupId/habits", userAuth, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (String(group.createdBy) !== String(req.userId))
      return res.status(403).json({ message: "Only creator can add habits" });

    const newHabit = {
      title,
      createdBy: req.userId,
      completions: group.members.map((m) => ({
        userId: m.userId,
        isDone: false,
        doneAt: null,
      })),
    };

    group.habits.push(newHabit);
    await group.save();

    return res.json({ success: true, group });
  } catch (err) {
    console.error("Add habit error:", err);
    return res.status(500).json({ success: false });
  }
});

/* ----------------------------------------------------
   MARK HABIT DONE
---------------------------------------------------- */
router.post("/:groupId/habits/:habitIndex/complete", userAuth, async (req, res) => {
  try {
    const { groupId, habitIndex } = req.params;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const index = Number(habitIndex);
    if (isNaN(index) || index < 0 || index >= group.habits.length)
      return res.status(400).json({ message: "Invalid habit index" });

    const habit = group.habits[index];

    const entry = habit.completions.find(
      (c) => String(c.userId) === String(req.userId)
    );

    if (!entry)
      return res.status(400).json({ message: "You are not part of this habit" });

    entry.isDone = true;
    entry.doneAt = new Date();

    // Recalculate daily total
    let points = 0;
    group.habits.forEach((h) =>
      h.completions.forEach((c) => {
        if (c.isDone) points += 5;
      })
    );

    group.totalGroupPoints = points;

    await group.save();

    return res.json({ success: true, group });
  } catch (err) {
    console.error("Complete habit error:", err);
    return res.status(500).json({ success: false });
  }
});

/* ----------------------------------------------------
   GROUP DETAILS
---------------------------------------------------- */
router.get("/:groupId", userAuth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.groupId))
      return res.status(400).json({ message: "Invalid group ID" });

    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const isMember = group.members.some(
      (m) => String(m.userId) === String(req.userId)
    );

    if (!isMember) return res.status(403).json({ message: "Not a member" });

    return res.json({ success: true, group });
  } catch (err) {
    console.error("Get group error:", err);
    return res.status(500).json({ success: false });
  }
});

export default router;
