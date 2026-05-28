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

  // 🔄 2. Background Synchronization Hook (Handles bulk operations and backups)
  useEffect(() => {
    if (state.loading) return;

    const currentChecksStr = JSON.stringify(state.checks);
    // Skip if the layout hasn't actually modified keys since the last pass
    if (currentChecksStr === previousChecksStr.current) return;
    previousChecksStr.current = currentChecksStr;

    const syncWithBackend = async () => {
      // If using API, sync progress entirely (especially helpful for checkAll/uncheckAll bulk loops)
      if (USE_API) {
        try {
          console.log("⚡ Syncing full roadmap state with backend...");
          const result = await apiAdapter.save(
            state.checks,
            state.completionDates,
          );

          // If the save endpoint returns the re-calculated daily counts, sync them to frontend
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
        // Local Storage fallback tracker
        apiAdapter.save(
          state.checks,
          state.completionDates,
          state.dailyActivity,
        );
      }
    };

    // 400ms debounce buffer to let rapid clicking finish safely before network write operations
    const bounceTimer = setTimeout(syncWithBackend, 400);
    return () => clearTimeout(bounceTimer);
  }, [state.checks, state.completionDates, state.dailyActivity, state.loading]);

  // ─── ACTIONS ────────────────────────────────────────────────────────

  // 📝 1. TOGGLE ACTION (Optimistic + Fixed State Reference Capture)
  const toggle = useCallback(
    async (id) => {
      const wasCompleted = !!state.checks[id];
      const newCompletedState = !wasCompleted;

      // 1. Instantly click UI locally for zero-latency performance
      dispatch({
        type: "TOGGLE",
        payload: { id },
      });

      // 2. Persist directly to individual toggle engine endpoint
      if (USE_API) {
        try {
          const result = await apiAdapter.toggle(id, newCompletedState);

          if (result && result.success) {
            // Overwrite local activity tracking array with backend's absolute data array calculation
            dispatch({
              type: "TOGGLE_SUCCESS",
              payload: { dailyActivity: result.dailyActivity || [] },
            });
          } else {
            throw new Error("Server rejected state change");
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
    [state.checks], // Dependency footprint simplified cleanly
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
