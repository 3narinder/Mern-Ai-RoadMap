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

  // 🚀 FIX: Cache the full state snapshot string to prevent early exit blocking
  const previousStateStr = useRef("");

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

        // Initialize snapshot with everything retrieved
        previousStateStr.current = JSON.stringify({
          checks: data.checks || {},
          dailyActivity: data.dailyActivity || [],
        });
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    };

    load();
  }, []);

  // 🔄 2. Background Synchronization Hook
  useEffect(() => {
    if (state.loading) return;

    // 🚀 FIX: Track both maps together. If dailyActivity alters via bulk actions, sync executes!
    const currentStateStr = JSON.stringify({
      checks: state.checks,
      dailyActivity: state.dailyActivity,
    });

    if (currentStateStr === previousStateStr.current) return;
    previousStateStr.current = currentStateStr;

    const syncWithBackend = async () => {
      if (USE_API) {
        try {
          const result = await apiAdapter.save(
            state.checks,
            state.completionDates,
            state.dailyActivity,
          );

          if (result && result.dailyActivity) {
            // Update the string cache right before dispatching to prevent an infinite recursive loop
            previousStateStr.current = JSON.stringify({
              checks: state.checks,
              dailyActivity: result.dailyActivity,
            });

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

  // 📝 1. TOGGLE ACTION
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

          if (result && result.dailyActivity) {
            // Match the state string update protocol here too
            previousStateStr.current = JSON.stringify({
              checks: { ...state.checks, [id]: newCompletedState },
              dailyActivity: result.dailyActivity,
            });

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
          dispatch({
            type: "TOGGLE",
            payload: { id },
          });
        }
      }
    },
    [state.checks],
  );

  // 👥 2. BULK OPERATIONS
  const checkAll = useCallback(
    async (ids) => {
      dispatch({
        type: "CHECK_MANY",
        payload: ids,
      });
    },
    [state.checks, state.completionDates, state.dailyActivity],
  );

  const uncheckAll = useCallback(
    async (ids) => {
      dispatch({
        type: "UNCHECK_MANY",
        payload: ids,
      });
    },
    [state.checks, state.completionDates, state.dailyActivity],
  );

  // 🗑️ 3. CLEAR ALL PROGRESS DATA
  const clearAll = useCallback(async () => {
    const previousState = { ...state };

    dispatch({ type: "CLEAR" });
    previousStateStr.current = JSON.stringify({
      checks: {},
      dailyActivity: [],
    });

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

    toggle,
    checkAll,
    uncheckAll,
    clearAll,

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
