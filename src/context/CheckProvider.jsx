import { useReducer, useEffect, useCallback } from "react";

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

  // 📥 On initial mount, pull progress data down from database
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
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    };

    load();
  }, []);

  // 🔄 Local storage synchronization fallback (Only runs if USE_API is false)
  useEffect(() => {
    if (state.loading) return;

    if (!USE_API) {
      apiAdapter.save(state.checks, state.completionDates, state.dailyActivity);
    }
  }, [state.checks, state.completionDates, state.dailyActivity, state.loading]);

  // ─── ACTIONS ────────────────────────────────────────────────────────

  // 📝 1. TOGGLE ACTION (Optimistic with Automatic Network Rollback)
  const toggle = useCallback(
    async (id) => {
      const wasCompleted = !!state.checks[id];
      const newCompletedState = !wasCompleted;

      // Click UI checkbox instantly for high performance responsiveness
      dispatch({
        type: "TOGGLE",
        payload: { id },
      });

      if (USE_API) {
        try {
          const result = await apiAdapter.toggle(id, newCompletedState);

          if (result.success) {
            dispatch({
              type: "TOGGLE_SUCCESS",
              payload: { dailyActivity: result.dailyActivity },
            });
          } else {
            throw new Error("Server rejected state change");
          }
        } catch (err) {
          console.error("❌ Sync failure, rolling back UI:", err.message);
          // Reverse state switch if server request crashes out
          dispatch({
            type: "TOGGLE",
            payload: { id },
          });
        }
      }
    },
    [state.checks, state.dailyActivity],
  );

  // 👥 2. BULK OPERATIONS
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

  // 🗑️ 3. CLEAN SINGLE CLEAR_ALL ACTION DEFINITION
  const clearAll = useCallback(async () => {
    const previousState = { ...state };

    dispatch({ type: "CLEAR" });

    if (USE_API) {
      try {
        await apiAdapter.clear();
      } catch (err) {
        console.error("❌ Clear operation failed on server:", err);
        // Rollback layout to state snapshot memory if server unreachable
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
