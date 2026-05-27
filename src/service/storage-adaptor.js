const STORAGE_KEY = "roadmap_checks_v1";

// ─────────────────────────────────────────────────────────────
// LOCAL STORAGE ADAPTER
// ─────────────────────────────────────────────────────────────

export const localAdapter = {
  async load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) return {};

      return JSON.parse(raw);
    } catch (error) {
      console.error("[localAdapter.load]", error);

      return {};
    }
  },

  async save(checks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));

      return {
        success: true,
      };
    } catch (error) {
      console.error("[localAdapter.save]", error);

      return {
        success: false,
        error: error.message,
      };
    }
  },

  async clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);

      return {
        success: true,
      };
    } catch (error) {
      console.error("[localAdapter.clear]", error);

      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// ─────────────────────────────────────────────────────────────
// API ADAPTER
// Uncomment when backend is ready
// ─────────────────────────────────────────────────────────────

// export const apiAdapter = {
//   async load() {
//     try {
//       const res = await fetch("/api/progress", {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         throw new Error(
//           `Failed to load progress (${res.status})`,
//         );
//       }

//       const data = await res.json();

//       return data?.checks || {};
//     } catch (error) {
//       console.error("[apiAdapter.load]", error);

//       return {};
//     }
//   },

//   async save(checks) {
//     try {
//       const res = await fetch("/api/progress", {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           checks,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error(
//           `Failed to save progress (${res.status})`,
//         );
//       }

//       return {
//         success: true,
//       };
//     } catch (error) {
//       console.error("[apiAdapter.save]", error);

//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },

//   async clear() {
//     try {
//       const res = await fetch("/api/progress", {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         throw new Error(
//           `Failed to clear progress (${res.status})`,
//         );
//       }

//       return {
//         success: true,
//       };
//     } catch (error) {
//       console.error("[apiAdapter.clear]", error);

//       return {
//         success: false,
//         error: error.message,
//       };
//     }
//   },
// };

// ─────────────────────────────────────────────────────────────
// ACTIVE ADAPTER
// Swap this line when backend is ready
// ─────────────────────────────────────────────────────────────

export const adapter = localAdapter;

// export const adapter = apiAdapter;
