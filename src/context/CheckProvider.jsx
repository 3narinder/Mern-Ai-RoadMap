import { useReducer, useEffect, useCallback } from "react";

import CheckContext from "./CheckContext";
import { reducer, initialState } from "./reducer";

import {
  countChecked,
  pctComplete,
  allChecked,
  isChecked,
} from "../utils/check-helpers";
import { adapter } from "../service/storage-adaptor";

export function CheckProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // load
  useEffect(() => {
    adapter
      .load()
      .then((checks) =>
        dispatch({
          type: "LOADED",
          payload: checks,
        }),
      )
      .catch((err) =>
        dispatch({
          type: "ERROR",
          payload: err.message,
        }),
      );
  }, []);

  // persist
  useEffect(() => {
    if (state.loading) return;
    adapter.save(state.checks);
  }, [state.checks, state.loading]);

  // actions
  const toggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE",
      payload: id,
    });
  }, []);

  const checkAll = useCallback((ids) => {
    dispatch({
      type: "CHECK_MANY",
      payload: ids,
    });
  }, []);

  const uncheckAll = useCallback((ids) => {
    dispatch({
      type: "UNCHECK_MANY",
      payload: ids,
    });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: "CLEAR" });
    adapter.clear();
  }, []);

  const value = {
    checks: state.checks,
    loading: state.loading,
    error: state.error,

    // actions
    toggle,
    checkAll,
    uncheckAll,
    clearAll,

    // selectors
    isChecked: (id) => isChecked(state.checks, id),

    countChecked: (ids) => countChecked(state.checks, ids),

    pctComplete: (ids) => pctComplete(state.checks, ids),

    allChecked: (ids) => allChecked(state.checks, ids),
  };

  return (
    <CheckContext.Provider value={value}>{children}</CheckContext.Provider>
  );
}
