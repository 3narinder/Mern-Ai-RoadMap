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

// 🟩 STEP 1: Calibrate map builder to handle missing 'count' properties
export const buildActivityMap = (dailyActivity) => {
  const map = {};

  if (Array.isArray(dailyActivity)) {
    dailyActivity.forEach((item) => {
      if (item && item.date) {
        // 🚀 FIX: If 'count' is missing/undefined but the item exists, treat it as at least 1 completion!
        const rawCount = item.count !== undefined ? item.count : 1;

        const parsedCount = parseInt(rawCount, 10);

        // Force it to be a valid number
        map[item.date] = Number.isNaN(parsedCount)
          ? 1
          : Math.max(0, parsedCount);
      }
    });
  }

  return map;
};

// Helper function to get today's date in YYYY-MM-DD format (timezone-aware)
const getTodayDateStr = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("T")[0];
};

// 🟩 STEP 2: Clean up the syntax block typo in calculateStats
export const calculateStats = (activityMap) => {
  if (!activityMap || Object.keys(activityMap).length === 0) {
    return { totalCompletions: 0, activeDays: 0, currentStreak: 0 };
  }

  const totalCompletions = Object.values(activityMap).reduce(
    (sum, count) => sum + (Number.isNaN(count) ? 0 : count),
    0,
  );

  const activeDays = Object.keys(activityMap).filter(
    (date) => activityMap[date] > 0,
  ).length;

  let currentStreak = 0;
  const todayStr = getTodayDateStr();
  let checkDate = new Date(todayStr);
  checkDate.setUTCHours(0, 0, 0, 0);

  let loopSafety = 0;

  while (loopSafety < 366) {
    const dateStr = checkDate.toISOString().split("T")[0];
    const dayValue = activityMap[dateStr] || 0;

    if (dayValue > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (dateStr === todayStr) {
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }

    loopSafety++;
  }

  return {
    totalCompletions: Number.isNaN(totalCompletions) ? 0 : totalCompletions,
    activeDays: Number.isNaN(activeDays) ? 0 : activeDays,
    currentStreak: Number.isNaN(currentStreak) ? 0 : currentStreak,
  };
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
