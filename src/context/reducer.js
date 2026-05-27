export const initialState = {
  checks: {},
  loading: true,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "LOADED":
      return {
        ...state,
        checks: action.payload,
        loading: false,
      };

    case "TOGGLE": {
      const id = action.payload;

      return {
        ...state,
        checks: {
          ...state.checks,
          [id]: !state.checks[id],
        },
      };
    }

    case "CHECK_MANY": {
      const updates = Object.fromEntries(
        action.payload.map((id) => [id, true]),
      );

      return {
        ...state,
        checks: {
          ...state.checks,
          ...updates,
        },
      };
    }

    case "UNCHECK_MANY": {
      const updates = Object.fromEntries(
        action.payload.map((id) => [id, false]),
      );

      return {
        ...state,
        checks: {
          ...state.checks,
          ...updates,
        },
      };
    }

    case "CLEAR":
      return {
        ...state,
        checks: {},
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
