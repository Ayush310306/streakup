import cron from "node-cron";
import Group from "../models/Group.js";

cron.schedule("0 0 * * *", async () => {
  console.log("🔥 Running daily streak & habit reset...");

  try {
    const groups = await Group.find();

    for (let group of groups) {
      let allDone = true;

      group.habits.forEach(habit => {
        habit.completions.forEach(c => {
          if (!c.isDone) {
            allDone = false;
            return;
          }
        });
      });

      // Update streak
      if (group.habits.length > 0) {
        if (allDone) {
          group.groupStreak += 1;
        } else {
          group.groupStreak = 0;
        }
      }

      // RESET FOR NEXT DAY
      group.habits.forEach(habit => {
        habit.completions.forEach(c => {
          c.isDone = false;
          c.doneAt = null;
        });
      });

      await group.save();
    }

    console.log("✅ Daily reset completed");
  } catch (error) {
    console.error("❌ Cron Error:", error);
  }
});
