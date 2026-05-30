export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Color intensity based on activity count (GitHub-style)
export const getColorClass = (count) => {
  if (count === 0) return "bg-gray-100 border-gray-200";
  if (count === 1) return "bg-emerald-200 border-emerald-300";
  if (count <= 3) return "bg-emerald-400 border-emerald-500";
  if (count <= 6) return "bg-emerald-500 border-emerald-600";
  return "bg-emerald-600 border-emerald-700";
};

export const getLegendColors = () => [
  { label: "None", class: "bg-gray-100 border border-gray-200" },
  { label: "1", class: "bg-emerald-200 border border-emerald-300" },
  { label: "2-3", class: "bg-emerald-400 border border-emerald-500" },
  { label: "4-6", class: "bg-emerald-500 border border-emerald-600" },
  { label: "7+", class: "bg-emerald-600 border border-emerald-700" },
];

// Build activity map from dailyActivity array
export const buildActivityMap = (dailyActivity) => {
  const map = {};
  if (Array.isArray(dailyActivity)) {
    dailyActivity.forEach(({ date, count }) => {
      map[date] = Math.max(0, count);
    });
  }
  return map;
};

// Calculate statistics from activity map
export const calculateStats = (activityMap) => {
  const totalCompletions = Object.values(activityMap).reduce(
    (sum, count) => sum + count,
    0,
  );
  const activeDays = Object.keys(activityMap).filter(
    (date) => activityMap[date] > 0,
  ).length;

  let currentStreak = 0;
  const today = new Date();
  let checkDate = new Date(today);

  while (true) {
    const dateStr = checkDate.toISOString().split("T")[0];
    if (activityMap[dateStr] > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (dateStr === today.toISOString().split("T")[0]) {
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { totalCompletions, activeDays, currentStreak };
};

// Generate calendar grid for the last 365 days
export const generateCalendarData = (activityMap) => {
  const today = new Date();
  const weeks = [];
  const months = [];

  // Start from 364 days ago
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);

  // Adjust to start from Sunday
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);

  let currentDate = new Date(startDate);
  let lastMonthLabel = "";

  while (currentDate <= today) {
    const week = [];
    let weekHasMonthLabel = false;
    let labelToAssign = "";

    for (let day = 0; day < 7; day++) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const count = activityMap[dateStr] || 0;
      const isToday = dateStr === today.toISOString().split("T")[0];
      const isFuture = currentDate > today;

      // Check if month changes at any point during this week's collection loop
      const monthLabel = MONTHS[currentDate.getMonth()];
      if (monthLabel !== lastMonthLabel && !weekHasMonthLabel) {
        lastMonthLabel = monthLabel;
        labelToAssign = monthLabel;
        weekHasMonthLabel = true;
      }

      week.push({
        date: dateStr,
        count,
        isToday,
        isFuture,
        dayOfWeek: day,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push(week);
    months.push(labelToAssign); // Align months array index directly with week index
  }

  return { weeks, months };
};
