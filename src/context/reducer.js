export const initialState = {
  checks: {},
  completionDates: {},
  dailyActivity: [],
  loading: true,
  error: null,
};

// Helper function to get today's date format (YYYY-MM-DD) in local time
const getTodayStr = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("T")[0];
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
        error: null,
      };

    case "TOGGLE": {
      const id = action.payload.id;
      const newCompleted = !state.checks[id];
      const now = new Date();
      const today = getTodayStr();

      // 1. Update completion dates
      const newCompletionDates = { ...state.completionDates };
      if (newCompleted) {
        newCompletionDates[id] = now.toISOString();
      } else {
        delete newCompletionDates[id];
      }

      // 2. Update daily activity array
      let newDailyActivity = [...state.dailyActivity];
      const actIdx = newDailyActivity.findIndex((a) => a.date === today);

      if (newCompleted) {
        if (actIdx >= 0) {
          newDailyActivity[actIdx] = {
            ...newDailyActivity[actIdx],
            count: newDailyActivity[actIdx].count + 1,
          };
        } else {
          newDailyActivity.push({ date: today, count: 1 });
        }
      } else {
        if (actIdx >= 0) {
          const updatedCount = Math.max(0, newDailyActivity[actIdx].count - 1);
          if (updatedCount === 0) {
            newDailyActivity.splice(actIdx, 1);
          } else {
            newDailyActivity[actIdx] = {
              ...newDailyActivity[actIdx],
              count: updatedCount,
            };
          }
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

    case "TOGGLE_SUCCESS":
      return {
        ...state,
        dailyActivity: action.payload.dailyActivity || [],
      };

    case "CHECK_MANY": {
      const targetIds = action.payload || [];
      const nextChecks = { ...state.checks };
      const nextCompletionDates = { ...state.completionDates };
      const today = getTodayStr();
      const isoNow = new Date().toISOString();

      let newlyCheckedCount = 0;

      targetIds.forEach((id) => {
        if (!nextChecks[id]) {
          nextChecks[id] = true;
          nextCompletionDates[id] = isoNow;
          newlyCheckedCount++;
        }
      });

      let nextActivity = [...(state.dailyActivity || [])];

      if (newlyCheckedCount > 0) {
        const idx = nextActivity.findIndex((a) => a.date === today);
        if (idx >= 0) {
          nextActivity[idx] = {
            ...nextActivity[idx],
            count: nextActivity[idx].count + newlyCheckedCount,
          };
        } else {
          nextActivity.push({ date: today, count: newlyCheckedCount });
        }
      }

      return {
        ...state,
        checks: nextChecks,
        completionDates: nextCompletionDates,
        dailyActivity: nextActivity,
      };
    }

    case "UNCHECK_MANY": {
      const targetIds = action.payload || [];
      const nextChecks = { ...state.checks };
      const nextCompletionDates = { ...state.completionDates };
      const today = getTodayStr();

      let newlyUncheckedCount = 0;

      targetIds.forEach((id) => {
        if (nextChecks[id]) {
          delete nextChecks[id];
          delete nextCompletionDates[id];
          newlyUncheckedCount++;
        }
      });

      let nextActivity = [...(state.dailyActivity || [])];

      if (newlyUncheckedCount > 0) {
        const idx = nextActivity.findIndex((a) => a.date === today);
        if (idx >= 0) {
          const updatedCount = Math.max(
            0,
            nextActivity[idx].count - newlyUncheckedCount,
          );

          if (updatedCount <= 0) {
            nextActivity.splice(idx, 1);
          } else {
            nextActivity[idx] = {
              ...nextActivity[idx],
              count: updatedCount,
            };
          }
        }
      }

      return {
        ...state,
        checks: nextChecks,
        completionDates: nextCompletionDates,
        dailyActivity: nextActivity,
      };
    }

    case "CLEAR":
      return {
        ...state,
        checks: {},
        completionDates: {},
        dailyActivity: [],
        error: null,
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
