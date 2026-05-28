import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

const getTodayDate = () => new Date().toISOString().split("T")[0];

// ─────────────────────────────────────────────────────────────
// GET /api/progress - Load all checkbox data
// ─────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    console.log("📥 GET /api/progress - Loading progress...");
    
    const userId = req.query.userId || "default_user";
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      console.log("📄 No progress found, returning empty data");
      return res.json({
        checks: {},
        completionDates: {},
        dailyActivity: [],
      });
    }

    console.log("✅ Progress loaded:", {
      checks: Object.fromEntries(progress.checks).length + " items",
      activity: progress.dailyActivity.length + " days",
    });

    res.json({
      checks: Object.fromEntries(progress.checks),
      completionDates: Object.fromEntries(progress.completionDates),
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    console.error("❌ GET /api/progress error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/progress/toggle - Toggle a single checkbox
// ─────────────────────────────────────────────────────────────
router.post("/toggle", async (req, res) => {
  try {
    const userId = req.body.userId || "default_user";
    const { id, completed } = req.body;
    const today = getTodayDate();

    console.log(`📝 POST /api/progress/toggle - Item: ${id}, Completed: ${completed}`);

    // Find or create progress document
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      console.log("📄 Creating new progress document...");
      progress = new Progress({
        userId,
        checks: new Map(),
        completionDates: new Map(),
        dailyActivity: [],
      });
    }

    // Update checkbox state
    progress.checks.set(id, completed);

    // Update completion date and daily activity
    if (completed) {
      progress.completionDates.set(id, new Date().toISOString());

      // Update daily activity count
      const activityIndex = progress.dailyActivity.findIndex(
        (a) => a.date === today
      );
      if (activityIndex >= 0) {
        progress.dailyActivity[activityIndex].count += 1;
      } else {
        progress.dailyActivity.push({ date: today, count: 1 });
      }

      console.log("✅ Item marked as completed");
    } else {
      progress.completionDates.delete(id);
      console.log("⭕ Item marked as incomplete");
    }

    await progress.save();

    res.json({
      success: true,
      completedAt: progress.completionDates.get(id) || null,
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    console.error("❌ POST /api/progress/toggle error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/progress - Save all checkboxes (full sync)
// ─────────────────────────────────────────────────────────────
router.put("/", async (req, res) => {
  try {
    const userId = req.body.userId || "default_user";
    const { checks, completionDates, dailyActivity } = req.body;

    console.log(`💾 PUT /api/progress - Saving ${Object.keys(checks || {}).length} items`);

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({
        userId,
        checks: new Map(Object.entries(checks || {})),
        completionDates: new Map(Object.entries(completionDates || {})),
        dailyActivity: dailyActivity || [],
      });
    } else {
      progress.checks = new Map(Object.entries(checks || {}));
      progress.completionDates = new Map(Object.entries(completionDates || {}));
      progress.dailyActivity = dailyActivity || [];
    }

    await progress.save();

    console.log("✅ Progress saved successfully");

    res.json({ success: true });
  } catch (error) {
    console.error("❌ PUT /api/progress error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/progress - Clear all progress
// ─────────────────────────────────────────────────────────────
router.delete("/", async (req, res) => {
  try {
    const userId = req.query.userId || "default_user";

    console.log(`🗑️  DELETE /api/progress - Clearing all data`);

    await Progress.deleteOne({ userId });

    console.log("✅ All progress cleared");

    res.json({ success: true });
  } catch (error) {
    console.error("❌ DELETE /api/progress error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/progress/activity - Get daily activity data
// ─────────────────────────────────────────────────────────────
router.get("/activity", async (req, res) => {
  try {
    const userId = req.query.userId || "default_user";

    console.log("📊 GET /api/progress/activity - Loading activity data");

    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.json({ dailyActivity: [] });
    }

    console.log(`✅ Activity data loaded: ${progress.dailyActivity.length} days`);

    res.json({ dailyActivity: progress.dailyActivity });
  } catch (error) {
    console.error("❌ GET /api/progress/activity error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
