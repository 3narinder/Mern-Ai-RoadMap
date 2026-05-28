import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

// GET /api/progress - Load progress
router.get("/", async (req, res) => {
  try {
    const identifier = req.query.identifier || "default_user";

    let progress = await Progress.findOne({ identifier });

    if (!progress) {
      // Return empty progress if none exists
      return res.json({
        checks: {},
        completionDates: {},
        dailyActivity: [],
      });
    }

    // Convert checks array to object format for frontend compatibility
    const checksObj = {};
    const completionDates = {};

    progress.checks.forEach((item) => {
      checksObj[item.id] = item.completed;
      if (item.completedAt) {
        completionDates[item.id] = item.completedAt.toISOString();
      }
    });

    res.json({
      checks: checksObj,
      completionDates,
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    console.error("[GET /api/progress]", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/progress - Save progress (full sync)
router.put("/", async (req, res) => {
  try {
    const identifier = req.body.identifier || "default_user";
    const { checks, completionDates } = req.body;

    // Convert checks object to array format for MongoDB
    const checksArray = Object.entries(checks).map(([id, completed]) => ({
      id,
      completed,
      completedAt: completionDates?.[id] ? new Date(completionDates[id]) : null,
    }));

    let progress = await Progress.findOne({ identifier });

    if (!progress) {
      progress = new Progress({
        identifier,
        checks: checksArray,
        dailyActivity: [],
      });
    } else {
      progress.checks = checksArray;
    }

    await progress.save();

    res.json({ success: true });
  } catch (error) {
    console.error("[PUT /api/progress]", error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/progress/toggle - Toggle a single item
router.post("/toggle", async (req, res) => {
  try {
    const identifier = req.body.identifier || "default_user";
    const { id, completed } = req.body;
    const today = getTodayDate();

    let progress = await Progress.findOne({ identifier });

    if (!progress) {
      progress = new Progress({
        identifier,
        checks: [],
        dailyActivity: [],
      });
    }

    // Find or create the check item
    const existingIndex = progress.checks.findIndex((c) => c.id === id);

    if (existingIndex >= 0) {
      progress.checks[existingIndex].completed = completed;
      progress.checks[existingIndex].completedAt = completed ? new Date() : null;
    } else {
      progress.checks.push({
        id,
        completed,
        completedAt: completed ? new Date() : null,
      });
    }

    // Update daily activity if completing (not uncompleting)
    if (completed) {
      const activityIndex = progress.dailyActivity.findIndex(
        (a) => a.date === today
      );

      if (activityIndex >= 0) {
        progress.dailyActivity[activityIndex].count += 1;
      } else {
        progress.dailyActivity.push({
          date: today,
          count: 1,
        });
      }
    }

    await progress.save();

    // Return the completion date for this item
    const checkItem = progress.checks.find((c) => c.id === id);

    res.json({
      success: true,
      completedAt: checkItem?.completedAt?.toISOString() || null,
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    console.error("[POST /api/progress/toggle]", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/progress - Clear all progress
router.delete("/", async (req, res) => {
  try {
    const identifier = req.query.identifier || "default_user";

    await Progress.findOneAndDelete({ identifier });

    res.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/progress]", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/progress/activity - Get activity data for heatmap
router.get("/activity", async (req, res) => {
  try {
    const identifier = req.query.identifier || "default_user";

    const progress = await Progress.findOne({ identifier });

    if (!progress) {
      return res.json({ dailyActivity: [] });
    }

    res.json({ dailyActivity: progress.dailyActivity });
  } catch (error) {
    console.error("[GET /api/progress/activity]", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
