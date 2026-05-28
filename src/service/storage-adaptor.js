const STORAGE_KEY = "roadmap_checks_v1";
const COMPLETION_DATES_KEY = "roadmap_completion_dates_v1";
const ACTIVITY_KEY = "roadmap_activity_v1";

// ─────────────────────────────────────────────────────────────
// LOCAL STORAGE ADAPTER (Fallback)
// ─────────────────────────────────────────────────────────────

export const localAdapter = {
  async load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const datesRaw = localStorage.getItem(COMPLETION_DATES_KEY);
      const activityRaw = localStorage.getItem(ACTIVITY_KEY);

      return {
        checks: raw ? JSON.parse(raw) : {},
        completionDates: datesRaw ? JSON.parse(datesRaw) : {},
        dailyActivity: activityRaw ? JSON.parse(activityRaw) : [],
      };
    } catch (error) {
      console.error("[localAdapter.load]", error);
      return { checks: {}, completionDates: {}, dailyActivity: [] };
    }
  },

  async save(checks, completionDates, dailyActivity) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
      localStorage.setItem(COMPLETION_DATES_KEY, JSON.stringify(completionDates));
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(dailyActivity));
      return { success: true };
    } catch (error) {
      console.error("[localAdapter.save]", error);
      return { success: false, error: error.message };
    }
  },

  async toggle(id, completed, currentDates, currentActivity) {
    const today = new Date().toISOString().split("T")[0];
    const newDates = { ...currentDates };
    const newActivity = [...currentActivity];

    if (completed) {
      newDates[id] = new Date().toISOString();
      const actIdx = newActivity.findIndex((a) => a.date === today);
      if (actIdx >= 0) {
        newActivity[actIdx].count += 1;
      } else {
        newActivity.push({ date: today, count: 1 });
      }
    } else {
      delete newDates[id];
    }

    return {
      success: true,
      completedAt: newDates[id] || null,
      completionDates: newDates,
      dailyActivity: newActivity,
    };
  },

  async clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(COMPLETION_DATES_KEY);
      localStorage.removeItem(ACTIVITY_KEY);
      return { success: true };
    } catch (error) {
      console.error("[localAdapter.clear]", error);
      return { success: false, error: error.message };
    }
  },
};

// ─────────────────────────────────────────────────────────────
// API ADAPTER (MongoDB Backend)
// ─────────────────────────────────────────────────────────────

export const apiAdapter = {
  async load() {
    try {
      const res = await fetch("/api/progress", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to load progress (${res.status})`);
      }

      const data = await res.json();

      return {
        checks: data?.checks || {},
        completionDates: data?.completionDates || {},
        dailyActivity: data?.dailyActivity || [],
      };
    } catch (error) {
      console.error("[apiAdapter.load]", error);
      // Fallback to local storage on API failure
      return localAdapter.load();
    }
  },

  async save(checks, completionDates) {
    try {
      const res = await fetch("/api/progress", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checks, completionDates }),
      });

      if (!res.ok) {
        throw new Error(`Failed to save progress (${res.status})`);
      }

      return { success: true };
    } catch (error) {
      console.error("[apiAdapter.save]", error);
      return { success: false, error: error.message };
    }
  },

  async toggle(id, completed) {
    try {
      const res = await fetch("/api/progress/toggle", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed }),
      });

      if (!res.ok) {
        throw new Error(`Failed to toggle item (${res.status})`);
      }

      return await res.json();
    } catch (error) {
      console.error("[apiAdapter.toggle]", error);
      return { success: false, error: error.message };
    }
  },

  async clear() {
    try {
      const res = await fetch("/api/progress", {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to clear progress (${res.status})`);
      }

      return { success: true };
    } catch (error) {
      console.error("[apiAdapter.clear]", error);
      return { success: false, error: error.message };
    }
  },

  async getActivity() {
    try {
      const res = await fetch("/api/progress/activity", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to get activity (${res.status})`);
      }

      return await res.json();
    } catch (error) {
      console.error("[apiAdapter.getActivity]", error);
      return { dailyActivity: [] };
    }
  },
};

// ─────────────────────────────────────────────────────────────
// ACTIVE ADAPTER
// Uses API adapter when backend is available, falls back to local
// ─────────────────────────────────────────────────────────────

const USE_API = import.meta.env.VITE_USE_API === "true";

export const adapter = USE_API ? apiAdapter : localAdapter;
