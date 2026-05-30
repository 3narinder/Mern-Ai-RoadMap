import { useReducer, useEffect, useCallback, useRef } from "react";

import CheckContext from "./CheckContext";
import { reducer, initialState } from "./reducer";

import {
  countChecked,
  pctComplete,
  allChecked,
  isChecked,
} from "../utils/check-helpers";
import apiAdapter from "../service/storage-adaptor";

const USE_API = import.meta.env.VITE_USE_API === "true";

export function CheckProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Use a ref to prevent infinite sync loops between local state changes and backend saves
  const previousChecksStr = useRef("");

  // 📥 1. Initial Data Fetch on Mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiAdapter.load();

        dispatch({
          type: "LOADED",
          payload: {
            checks: data.checks || {},
            completionDates: data.completionDates || {},
            dailyActivity: data.dailyActivity || [],
          },
        });

        previousChecksStr.current = JSON.stringify(data.checks || {});
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    };

    load();
  }, []);

  // 🔄 2. Background Synchronization Hook (Inside your CheckProvider file)

  useEffect(() => {
    if (state.loading) return;

    const currentChecksStr = JSON.stringify(state.checks);
    if (currentChecksStr === previousChecksStr.current) return;
    previousChecksStr.current = currentChecksStr;

    const syncWithBackend = async () => {
      if (USE_API) {
        try {
          console.log("⚡ Syncing full roadmap state with backend...");

          // Send all active data matrices to your updated PUT endpoint
          const result = await apiAdapter.save(
            state.checks,
            state.completionDates,
            state.dailyActivity, // Sending local state as backup insurance
          );

          // 🚀 THE FIX: Dispatch the backend's verified array directly into your TOGGLE_SUCCESS reducer action
          if (result && result.dailyActivity) {
            dispatch({
              type: "TOGGLE_SUCCESS",
              payload: { dailyActivity: result.dailyActivity },
            });
          }
        } catch (err) {
          console.error("❌ Full sync persistence failure:", err.message);
        }
      } else {
        apiAdapter.save(
          state.checks,
          state.completionDates,
          state.dailyActivity,
        );
      }
    };

    const bounceTimer = setTimeout(syncWithBackend, 400);
    return () => clearTimeout(bounceTimer);
  }, [state.checks, state.completionDates, state.dailyActivity, state.loading]);

  // 📝 1. TOGGLE ACTION (Fixed Express Payload Capture)
  const toggle = useCallback(
    async (id) => {
      const wasCompleted = !!state.checks[id];
      const newCompletedState = !wasCompleted;

      dispatch({
        type: "TOGGLE",
        payload: { id },
      });

      if (USE_API) {
        try {
          const result = await apiAdapter.toggle(id, newCompletedState);

          // 🚀 THE CRITICAL FIX: Your Express server returns dailyActivity directly without a success flag!
          if (result && result.dailyActivity) {
            dispatch({
              type: "TOGGLE_SUCCESS",
              payload: { dailyActivity: result.dailyActivity },
            });
          }
        } catch (err) {
          console.error(
            "❌ Sync failure, rolling back UI check state:",
            err.message,
          );
          // Rollback toggle switch locally if network fails
          dispatch({
            type: "TOGGLE",
            payload: { id },
          });
        }
      }
    },
    [state.checks],
  );
  // 👥 2. BULK OPERATIONS (Will automatically fall back to background auto-syncer hook above)
  const checkAll = useCallback(async (ids) => {
    dispatch({
      type: "CHECK_MANY",
      payload: ids,
    });
  }, []);

  const uncheckAll = useCallback(async (ids) => {
    dispatch({
      type: "UNCHECK_MANY",
      payload: ids,
    });
  }, []);

  // 🗑️ 3. CLEAR ALL PROGRESS DATA
  const clearAll = useCallback(async () => {
    const previousState = { ...state };

    dispatch({ type: "CLEAR" });
    previousChecksStr.current = JSON.stringify({});

    if (USE_API) {
      try {
        await apiAdapter.clear();
      } catch (err) {
        console.error("❌ Clear operation failed on server:", err);
        dispatch({ type: "LOADED", payload: previousState });
      }
    }
  }, [state]);

  // ─── CONTEXT BINDINGS ───────────────────────────────────────────────
  const value = {
    checks: state.checks,
    completionDates: state.completionDates,
    dailyActivity: state.dailyActivity,
    loading: state.loading,
    error: state.error,

    // Bound handlers
    toggle,
    checkAll,
    uncheckAll,
    clearAll,

    // Functional Selectors
    isChecked: (id) => isChecked(state.checks, id),
    getCompletionDate: (id) => state.completionDates[id] || null,
    countChecked: (ids) => countChecked(state.checks, ids),
    pctComplete: (ids) => pctComplete(state.checks, ids),
    allChecked: (ids) => allChecked(state.checks, ids),
  };

  return (
    <CheckContext.Provider value={value}>{children}</CheckContext.Provider>
  );
}
