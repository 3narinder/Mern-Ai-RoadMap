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

export const adapter = apiAdapter;
