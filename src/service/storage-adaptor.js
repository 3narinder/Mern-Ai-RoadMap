// 💡 Change this string if your backend port changes (e.g., 3000 or 5000)
const BASE_URL = "http://localhost:5000";
const DEFAULT_USER = "default_user";
const STORAGE_KEY = `roadmap_progress_${DEFAULT_USER}`;

const apiAdapter = {
  // 📥 Load progress for the user
  async load() {
    const USE_API = import.meta.env.VITE_USE_API === "true";

    if (USE_API) {
      const res = await fetch(
        `${BASE_URL}/api/progress?userId=${DEFAULT_USER}`,
      );
      return res.json();
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored
        ? JSON.parse(stored)
        : { checks: {}, completionDates: {}, dailyActivity: [] };
    }
  },

  // 💾 Bulk save state / Full sync
  async save(checks, completionDates, dailyActivity = []) {
    const USE_API = import.meta.env.VITE_USE_API === "true";

    if (USE_API) {
      const res = await fetch(`${BASE_URL}/api/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: DEFAULT_USER, checks, completionDates }),
      });
      return res.json();
    } else {
      // Save to localStorage
      const data = { checks, completionDates, dailyActivity };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return { success: true };
    }
  },

  // 📝 Toggle a single checkbox state
  async toggle(id, completed) {
    const USE_API = import.meta.env.VITE_USE_API === "true";

    if (USE_API) {
      const res = await fetch(`${BASE_URL}/api/progress/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: DEFAULT_USER, id, completed }),
      });
      return res.json();
    } else {
      return { success: true };
    }
  },

  // 🗑️ Clear all data documents for this user
  async clear() {
    const USE_API = import.meta.env.VITE_USE_API === "true";

    if (USE_API) {
      const res = await fetch(
        `${BASE_URL}/api/progress?userId=${DEFAULT_USER}`,
        {
          method: "DELETE",
        },
      );
      return res.json();
    } else {
      // Clear localStorage
      localStorage.removeItem(STORAGE_KEY);
      return { success: true };
    }
  },

  // 📊 Fetch specific activity heatmap data
  async getActivity() {
    const USE_API = import.meta.env.VITE_USE_API === "true";

    if (USE_API) {
      const res = await fetch(
        `${BASE_URL}/api/progress/activity?userId=${DEFAULT_USER}`,
      );
      return res.json();
    } else {
      return { dailyActivity: [] };
    }
  },
};

export default apiAdapter;
