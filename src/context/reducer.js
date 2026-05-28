export const initialState = {
  checks: {},
  completionDates: {},
  dailyActivity: [],
  loading: true,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "LOADED":
      return {
        ...state,
        checks: action.payload.checks || {},
        completionDates: action.payload.completionDates || {},
        dailyActivity: action.payload.dailyActivity || [],
        loading: false,
      };

    case "TOGGLE": {
      const id = action.payload.id;
      const newCompleted = !state.checks[id];
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      // Update completion dates
      const newCompletionDates = { ...state.completionDates };
      if (newCompleted) {
        newCompletionDates[id] = now.toISOString();
      } else {
        delete newCompletionDates[id];
      }

      // Update daily activity
      let newDailyActivity = [...state.dailyActivity];
      if (newCompleted) {
        const actIdx = newDailyActivity.findIndex((a) => a.date === today);
        if (actIdx >= 0) {
          newDailyActivity[actIdx] = {
            ...newDailyActivity[actIdx],
            count: newDailyActivity[actIdx].count + 1,
          };
        } else {
          newDailyActivity.push({ date: today, count: 1 });
        }
      }

      return {
        ...state,
        checks: {
          ...state.checks,
          [id]: newCompleted,
        },
        completionDates: newCompletionDates,
        dailyActivity: newDailyActivity,
      };
    }

    case "TOGGLE_SUCCESS": {
      // Update from API response
      if (action.payload.dailyActivity) {
        return {
          ...state,
          dailyActivity: action.payload.dailyActivity,
        };
      }
      return state;
    }

    case "CHECK_MANY": {
      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const updates = Object.fromEntries(
        action.payload.map((id) => [id, true])
      );
      const dateUpdates = Object.fromEntries(
        action.payload
          .filter((id) => !state.checks[id])
          .map((id) => [id, now.toISOString()])
      );

      // Count new completions for activity
      const newCompletions = action.payload.filter((id) => !state.checks[id]).length;

      let newDailyActivity = [...state.dailyActivity];
      if (newCompletions > 0) {
        const actIdx = newDailyActivity.findIndex((a) => a.date === today);
        if (actIdx >= 0) {
          newDailyActivity[actIdx] = {
            ...newDailyActivity[actIdx],
            count: newDailyActivity[actIdx].count + newCompletions,
          };
        } else {
          newDailyActivity.push({ date: today, count: newCompletions });
        }
      }

      return {
        ...state,
        checks: {
          ...state.checks,
          ...updates,
        },
        completionDates: {
          ...state.completionDates,
          ...dateUpdates,
        },
        dailyActivity: newDailyActivity,
      };
    }

    case "UNCHECK_MANY": {
      const updates = Object.fromEntries(
        action.payload.map((id) => [id, false])
      );
      const newCompletionDates = { ...state.completionDates };
      action.payload.forEach((id) => delete newCompletionDates[id]);

      return {
        ...state,
        checks: {
          ...state.checks,
          ...updates,
        },
        completionDates: newCompletionDates,
      };
    }

    case "CLEAR":
      return {
        ...state,
        checks: {},
        completionDates: {},
        dailyActivity: [],
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
