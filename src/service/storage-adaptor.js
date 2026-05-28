// 💡 Change this string if your backend port changes (e.g., 3000 or 5000)
const BASE_URL = "http://localhost:5000";
const DEFAULT_USER = "default_user";

const apiAdapter = {
  // 📥 Load progress for the user
  async load() {
    const res = await fetch(`${BASE_URL}/api/progress?userId=${DEFAULT_USER}`);
    return res.json();
  },

  // 💾 Bulk save state / Full sync
  async save(checks, completionDates) {
    const res = await fetch(`${BASE_URL}/api/progress`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: DEFAULT_USER, checks, completionDates }),
    });
    return res.json();
  },

  // 📝 Toggle a single checkbox state
  async toggle(id, completed) {
    const res = await fetch(`${BASE_URL}/api/progress/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: DEFAULT_USER, id, completed }),
    });
    return res.json();
  },

  // 🗑️ Clear all data documents for this user
  async clear() {
    const res = await fetch(`${BASE_URL}/api/progress?userId=${DEFAULT_USER}`, {
      method: "DELETE",
    });
    return res.json();
  },

  // 📊 Fetch specific activity heatmap data
  async getActivity() {
    const res = await fetch(
      `${BASE_URL}/api/progress/activity?userId=${DEFAULT_USER}`,
    );
    return res.json();
  },
};

export default apiAdapter;
