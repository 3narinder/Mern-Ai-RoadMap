import Progress from "../models/Progress.js";

// Extracts userId from any location in the request safely
const getUserId = (req) => {
  return (
    req.body?.userId ||
    req.query?.userId ||
    req.headers?.["user-id"] ||
    "default_user"
  );
};

// Generates today's local date stamp string (YYYY-MM-DD)
const getTodayDate = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("T")[0];
};

// 📊 1. GET /api/progress
export const getProgress = async (req, res) => {
  try {
    const userId = getUserId(req);
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.json({ checks: {}, completionDates: {}, dailyActivity: [] });
    }

    return res.json({
      checks: Object.fromEntries(progress.checks || new Map()),
      completionDates: Object.fromEntries(
        progress.completionDates || new Map(),
      ),
      dailyActivity: progress.dailyActivity || [],
    });
  } catch (error) {
    return res.status(500).json({ error: `Fetch failed: ${error.message}` });
  }
};

// 🎛️ 2. POST /api/progress/toggle
export const toggleProgress = async (req, res) => {
  try {
    const userId = getUserId(req);
    const id = req.body.id || req.body.topicId || req.body.itemId;
    const completed =
      req.body.completed === true || req.body.completed === "true";

    if (!id || id === "undefined" || id === "null") {
      return res.status(400).json({
        success: false,
        error:
          "Mongoose Map Error Prevented: 'id' parameter is missing or undefined in the request body.",
      });
    }

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

    const stringId = String(id);
    const wasCompleted = progress.checks.get(stringId) === true;

    // Update structural status
    progress.checks.set(stringId, completed);

    const activityIndex = progress.dailyActivity.findIndex(
      (a) => a.date === today,
    );

    if (completed) {
      progress.completionDates.set(stringId, new Date().toISOString());
      if (!wasCompleted) {
        if (activityIndex >= 0) {
          progress.dailyActivity[activityIndex].count += 1;
        } else {
          progress.dailyActivity.push({ date: today, count: 1 });
        }
      }
    } else {
      progress.completionDates.delete(stringId);
      if (wasCompleted && activityIndex >= 0) {
        progress.dailyActivity[activityIndex].count -= 1;

        // 🚀 CRITICAL CLEANUP: If the day's activity drops to 0, wipe out the record block completely!
        if (progress.dailyActivity[activityIndex].count <= 0) {
          progress.dailyActivity.splice(activityIndex, 1);
        }
      }
    }

    progress.markModified("checks");
    progress.markModified("completionDates");
    progress.markModified("dailyActivity");

    await progress.save();

    return res.status(200).json({
      success: true,
      userId,
      id: stringId,
      completed,
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    console.error("❌ Toggle Controller Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// 💾 3. PUT /api/progress
export const syncProgress = async (req, res) => {
  try {
    const userId = getUserId(req);
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

      if (checks && typeof checks === "object") {
        Object.entries(checks).forEach(([k, v]) =>
          progress.checks.set(String(k), Boolean(v)),
        );
      }
      if (completionDates && typeof completionDates === "object") {
        Object.entries(completionDates).forEach(([k, v]) =>
          progress.completionDates.set(String(k), String(v)),
        );
      }

      // 🚀 CLEANUP ON BULK SYNC: Filter out any accidental zero-count values sent by clients
      if (Array.isArray(dailyActivity)) {
        progress.dailyActivity = dailyActivity.filter(
          (activity) => activity.count > 0,
        );
      }
    }

    progress.markModified("checks");
    progress.markModified("completionDates");
    progress.markModified("dailyActivity");

    await progress.save();

    return res.json({
      success: true,
      userId,
      dailyActivity: progress.dailyActivity,
    });
  } catch (error) {
    return res.status(500).json({ error: `Sync failed: ${error.message}` });
  }
};

// 🗑️ 4. DELETE /api/progress (Clear completely)
export const clearProgress = async (req, res) => {
  try {
    const userId = getUserId(req);
    await Progress.deleteOne({ userId });
    return res.json({
      success: true,
      message: "All user track records deleted.",
    });
  } catch (error) {
    return res.status(500).json({ error: `Clear failed: ${error.message}` });
  }
};

// 📊 5. GET /api/progress/activities
export const getActivity = async (req, res) => {
  try {
    const userId = getUserId(req);
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.json({ dailyActivity: [] });
    }

    return res.json({ dailyActivity: progress.dailyActivity || [] });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Activity fetch failed: ${error.message}` });
  }
};
