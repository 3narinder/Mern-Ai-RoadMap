import axios from "axios";

// Base URL - Production (relative path) or Local Development
const BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "";

const DEFAULT_USER = "default_user";
const STORAGE_KEY = `roadmap_progress_${DEFAULT_USER}`;

// Configure an Axios instance with base parameters
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const apiAdapter = {
  async load() {
    const USE_API = import.meta.env.VITE_USE_API !== "false";

    if (USE_API) {
      try {
        const response = await api.get(`/api/progress`, {
          params: { userId: DEFAULT_USER },
        });
        return response.data;
      } catch (error) {
        console.error("Error loading progress:", error);
        throw error;
      }
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored
        ? JSON.parse(stored)
        : { checks: {}, completionDates: {}, dailyActivity: [] };
    }
  },

  async save(checks, completionDates, dailyActivity = []) {
    const USE_API = import.meta.env.VITE_USE_API !== "false";

    if (USE_API) {
      try {
        const response = await api.put(`/api/progress`, {
          userId: DEFAULT_USER,
          checks,
          completionDates,
          dailyActivity,
        });
        return response.data;
      } catch (error) {
        console.error("Error saving progress:", error);
        throw error;
      }
    } else {
      // Save to localStorage
      const data = { checks, completionDates, dailyActivity };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return { success: true };
    }
  },

  // 📝 Toggle a single checkbox state
  async toggle(id, completed) {
    const USE_API = import.meta.env.VITE_USE_API !== "false";

    if (USE_API) {
      try {
        const response = await api.post(`/api/progress/toggle`, {
          userId: DEFAULT_USER,
          id,
          completed,
        });
        return response.data;
      } catch (error) {
        console.error("Error toggling item:", error);
        throw error;
      }
    } else {
      return { success: true };
    }
  },

  // 🗑️ Clear all data documents for this user
  async clear() {
    const USE_API = import.meta.env.VITE_USE_API !== "false";

    if (USE_API) {
      try {
        const response = await api.delete(`/api/progress`, {
          params: { userId: DEFAULT_USER },
        });
        return response.data;
      } catch (error) {
        console.error("Error clearing progress:", error);
        throw error;
      }
    } else {
      // Clear localStorage
      localStorage.removeItem(STORAGE_KEY);
      return { success: true };
    }
  },

  // 📊 Fetch specific activity heatmap data
  async getActivity() {
    const USE_API = import.meta.env.VITE_USE_API !== "false";

    if (USE_API) {
      try {
        const response = await api.get(`/api/progress/activity`, {
          params: { userId: DEFAULT_USER },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching activity:", error);
        return { dailyActivity: [] };
      }
    } else {
      return { dailyActivity: [] };
    }
  },
};

export default apiAdapter;
