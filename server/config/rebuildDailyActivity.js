import mongoose from "mongoose";
import Progress from "../models/Progress.js";

// connect to MongoDB
await mongoose.connect("mongodb code");

const rebuildDailyActivity = (completionDates) => {
  const counts = {};

  for (const dateStr of completionDates.values()) {
    const date = dateStr.split("T")[0]; // YYYY-MM-DD
    counts[date] = (counts[date] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

const run = async () => {
  const users = await Progress.find({});

  for (const progress of users) {
    progress.dailyActivity = rebuildDailyActivity(progress.completionDates);

    progress.markModified("dailyActivity");
    await progress.save();

    console.log(`Updated user: ${progress.userId}`);
  }

  console.log("✅ Done rebuilding all dailyActivity");
  process.exit();
};

run();
