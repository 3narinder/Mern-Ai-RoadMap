import Progress from "../models/Progress.js";

const getTodayDate = () => new Date().toISOString().split("T")[0];

// 📥 GET /api/progress
export const getProgress = async (req, res) => {
  try {
    const userId = req.query.userId || "default_user";
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.json({ checks: {}, completionDates: {}, dailyActivity: [] });
    }

    res.json({
      checks: Object.fromEntries(progress.checks),
      completionDates: Object.fromEntries(progress.completionDates),
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📝 POST /api/progress/toggle
export const toggleProgress = async (req, res) => {
  try {
    const userId = req.body.userId || "default_user";
    const { id, completed } = req.body;
    const today = getTodayDate();

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({
        userId,
        checks: new Map(),
        completionDates: new Map(),
        dailyActivity: [],
      });
    }

    progress.checks.set(id, completed);

    const activityIndex = progress.dailyActivity.findIndex(
      (a) => a.date === today,
    );

    if (completed) {
      // 🟩 CHECKED: Add/increment activity count
      progress.completionDates.set(id, new Date().toISOString());

      if (activityIndex >= 0) {
        progress.dailyActivity[activityIndex].count += 1;
      } else {
        progress.dailyActivity.push({ date: today, count: 1 });
      }
    } else {
      // 🟥 UNCHECKED: Decrement activity count safely
      progress.completionDates.delete(id);

      if (activityIndex >= 0) {
        progress.dailyActivity[activityIndex].count -= 1;

        // If the day's count drops to 0, remove the element so it resets to white
        if (progress.dailyActivity[activityIndex].count <= 0) {
          progress.dailyActivity.splice(activityIndex, 1);
        }
      }
    }

    // Force Mongoose tracking flags
    progress.markModified("checks");
    progress.markModified("completionDates");
    progress.markModified("dailyActivity");

    await progress.save();

    res.json({
      success: true,
      completedAt: progress.completionDates.get(id) || null,
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 💾 PUT /api/progress (Inside your backend controller)
export const syncProgress = async (req, res) => {
  try {
    const userId = req.body.userId || "default_user";
    const { checks, completionDates, dailyActivity } = req.body;

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({
        userId,
        checks: new Map(Object.entries(checks || {})),
        completionDates: new Map(Object.entries(completionDates || {})),
        dailyActivity: dailyActivity || [],
      });
    } else {
      progress.checks.clear();
      progress.completionDates.clear();

      if (checks && typeof checks === "object" && !Array.isArray(checks)) {
        Object.entries(checks).forEach(([key, value]) => {
          if (key && key !== "undefined") {
            progress.checks.set(String(key), Boolean(value));
          }
        });
      }

      if (
        completionDates &&
        typeof completionDates === "object" &&
        !Array.isArray(completionDates)
      ) {
        Object.entries(completionDates).forEach(([key, value]) => {
          if (key && key !== "undefined" && value) {
            progress.completionDates.set(String(key), String(value));
          }
        });
      }

      if (Array.isArray(dailyActivity)) {
        progress.dailyActivity = dailyActivity;
      }
    }

    if (progress && !progress.isNew) {
      progress.markModified("checks");
      progress.markModified("completionDates");
      progress.markModified("dailyActivity");
    }

    await progress.save();

    // 🚀 THE FIX: Return the updated data structure instead of just { success: true }
    res.json({
      success: true,
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 🗑️ DELETE /api/progress
export const clearProgress = async (req, res) => {
  try {
    const userId = req.query.userId || "default_user";
    await Progress.deleteOne({ userId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📊 GET /api/progress/activity
export const getActivity = async (req, res) => {
  try {
    const userId = req.query.userId || "default_user";
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.json({ dailyActivity: [] });
    }

    res.json({ dailyActivity: progress.dailyActivity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
