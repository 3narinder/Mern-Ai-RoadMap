export const countChecked = (checks, ids) =>
  ids.filter((id) => checks[id]).length;

export const pctComplete = (checks, ids) =>
  ids.length === 0
    ? 0
    : Math.round((countChecked(checks, ids) / ids.length) * 100);

export const allChecked = (checks, ids) =>
  ids.length > 0 && ids.every((id) => checks[id]);

export const isChecked = (checks, id) => !!checks[id];

// Format ISO date to display format (e.g., "Jun-02")
export const formatDateShort = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
};

// Get date range for a set of items
export const getDateRange = (completionDates, ids, allCompleted) => {
  const completedIds = ids.filter((id) => completionDates[id]);

  if (completedIds.length === 0) {
    return null;
  }

  const dates = completedIds.map((id) => new Date(completionDates[id]));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const startStr = formatDateShort(minDate.toISOString());
  const endStr = formatDateShort(maxDate.toISOString());

  if (allCompleted) {
    // Always show start and end date, even if same day
    return `${startStr} - ${endStr}`;
  } else {
    // If partially completed, show "started on X - in progress"
    return `${startStr} - in progress`;
  }
};
