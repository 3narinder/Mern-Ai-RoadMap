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

      // 1. Update completion dates
      const newCompletionDates = { ...state.completionDates };
      if (newCompleted) {
        newCompletionDates[id] = now.toISOString();
      } else {
        delete newCompletionDates[id];
      }

      // 2. Update daily activity (FIXED: Now handles subtraction on uncheck!)
      let newDailyActivity = [...state.dailyActivity];
      const actIdx = newDailyActivity.findIndex((a) => a.date === today);

      if (newCompleted) {
        // Handle Checking
        if (actIdx >= 0) {
          newDailyActivity[actIdx] = {
            ...newDailyActivity[actIdx],
            count: newDailyActivity[actIdx].count + 1,
          };
        } else {
          newDailyActivity.push({ date: today, count: 1 });
        }
      } else {
        // Handle Unchecking
        if (actIdx >= 0) {
          const updatedCount = Math.max(0, newDailyActivity[actIdx].count - 1);

          if (updatedCount === 0) {
            // Remove the date entry entirely so the square turns back to crisp white
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
        // Overwrite local activity with the server's absolute source of truth
        dailyActivity: action.payload.dailyActivity || [],
      };

    case "CHECK_MANY": {
      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const updates = Object.fromEntries(
        action.payload.map((id) => [id, true]),
      );
      const dateUpdates = Object.fromEntries(
        action.payload
          .filter((id) => !state.checks[id])
          .map((id) => [id, now.toISOString()]),
      );

      // Count new completions for activity
      const newCompletions = action.payload.filter(
        (id) => !state.checks[id],
      ).length;

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
      const today = new Date().toISOString().split("T")[0];
      const updates = Object.fromEntries(
        action.payload.map((id) => [id, false]),
      );

      const newCompletionDates = { ...state.completionDates };

      // Count how many items were ACTUALLY checked before we remove them
      const itemsToUncheckCount = action.payload.filter(
        (id) => state.checks[id] === true,
      ).length;

      action.payload.forEach((id) => delete newCompletionDates[id]);

      // 3. Update daily activity (FIXED: Subtract multi-unchecks from today's counts)
      let newDailyActivity = [...state.dailyActivity];
      if (itemsToUncheckCount > 0) {
        const actIdx = newDailyActivity.findIndex((a) => a.date === today);
        if (actIdx >= 0) {
          const updatedCount = Math.max(
            0,
            newDailyActivity[actIdx].count - itemsToUncheckCount,
          );
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
          ...updates,
        },
        completionDates: newCompletionDates,
        dailyActivity: newDailyActivity,
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
