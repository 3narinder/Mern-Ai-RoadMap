import { useReducer, useEffect, useCallback } from "react";

import CheckContext from "./CheckContext";
import { reducer, initialState } from "./reducer";

import {
  countChecked,
  pctComplete,
  allChecked,
  isChecked,
} from "../utils/check-helpers";
import { adapter, apiAdapter } from "../service/storage-adaptor";

const USE_API = import.meta.env.VITE_USE_API === "true";

export function CheckProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // load
  useEffect(() => {
    adapter
      .load()
      .then((data) =>
        dispatch({
          type: "LOADED",
          payload: {
            checks: data.checks || {},
            completionDates: data.completionDates || {},
            dailyActivity: data.dailyActivity || [],
          },
        }),
      )
      .catch((err) =>
        dispatch({
          type: "ERROR",
          payload: err.message,
        }),
      );
  }, []);

  // persist on changes (debounced for local adapter)
  useEffect(() => {
    if (state.loading) return;

    // For API adapter, we handle saving on each action
    // For local adapter, save the full state
    if (!USE_API) {
      adapter.save(state.checks, state.completionDates, state.dailyActivity);
    }
  }, [state.checks, state.completionDates, state.dailyActivity, state.loading]);

  // actions
  const toggle = useCallback(
    async (id) => {
      const newCompleted = !state.checks[id];

      // Optimistic update
      dispatch({
        type: "TOGGLE",
        payload: { id },
      });

      // If using API, also update the server
      if (USE_API) {
        const result = await apiAdapter.toggle(id, newCompleted);
        if (result.success && result.dailyActivity) {
          dispatch({
            type: "TOGGLE_SUCCESS",
            payload: { dailyActivity: result.dailyActivity },
          });
        }
      }
    },
    [state.checks],
  );

  const checkAll = useCallback(async (ids) => {
    dispatch({
      type: "CHECK_MANY",
      payload: ids,
    });

    // Sync with API if enabled
    if (USE_API) {
      // We'll rely on the periodic sync for bulk operations
      // or implement a bulk toggle endpoint if needed
    }
  }, []);

  const uncheckAll = useCallback(async (ids) => {
    dispatch({
      type: "UNCHECK_MANY",
      payload: ids,
    });
  }, []);

  const clearAll = useCallback(async () => {
    dispatch({ type: "CLEAR" });
    await adapter.clear();
  }, []);

  const value = {
    checks: state.checks,
    completionDates: state.completionDates,
    dailyActivity: state.dailyActivity,
    loading: state.loading,
    error: state.error,

    // actions
    toggle,
    checkAll,
    uncheckAll,
    clearAll,

    // selectors
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
