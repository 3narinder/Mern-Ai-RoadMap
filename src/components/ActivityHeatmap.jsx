import { useMemo, useState } from "react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Color intensity based on activity count (GitHub-style)
const getColorClass = (count) => {
  if (count === 0) return "bg-gray-100";
  if (count === 1) return "bg-emerald-200";
  if (count <= 3) return "bg-emerald-400";
  if (count <= 6) return "bg-emerald-500";
  return "bg-emerald-600";
};

const getLegendColors = () => [
  { label: "None", class: "bg-gray-100" },
  { label: "1", class: "bg-emerald-200" },
  { label: "2-3", class: "bg-emerald-400" },
  { label: "4-6", class: "bg-emerald-500" },
  { label: "7+", class: "bg-emerald-600" },
];

const ActivityHeatmap = ({ dailyActivity = [], completionDates = {} }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Build activity map from both sources
  const activityMap = useMemo(() => {
    const map = {};

    // Add from dailyActivity array
    dailyActivity.forEach(({ date, count }) => {
      map[date] = (map[date] || 0) + count;
    });

    // Also count from completion dates for accuracy
    Object.values(completionDates).forEach((dateStr) => {
      if (dateStr) {
        const date = new Date(dateStr).toISOString().split("T")[0];
        if (!map[date]) map[date] = 0;
      }
    });

    return map;
  }, [dailyActivity, completionDates]);

  // Generate calendar grid for the last 365 days
  const calendarData = useMemo(() => {
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
    let currentMonth = -1;
    let weekIndex = 0;

    while (currentDate <= today) {
      // Track month changes for labels
      if (currentDate.getMonth() !== currentMonth) {
        currentMonth = currentDate.getMonth();
        months.push({ month: MONTHS[currentMonth], weekIndex });
      }

      const week = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split("T")[0];
        const count = activityMap[dateStr] || 0;
        const isToday = dateStr === today.toISOString().split("T")[0];
        const isFuture = currentDate > today;

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
      weekIndex++;
    }

    return { weeks, months };
  }, [activityMap]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalCompletions = Object.values(activityMap).reduce(
      (sum, count) => sum + count,
      0
    );
    const activeDays = Object.keys(activityMap).filter(
      (date) => activityMap[date] > 0
    ).length;
    const maxInDay = Math.max(0, ...Object.values(activityMap));

    // Current streak
    let currentStreak = 0;
    const today = new Date();
    let checkDate = new Date(today);

    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (activityMap[dateStr] > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr === today.toISOString().split("T")[0]) {
        // Today might not have activity yet, check yesterday
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return { totalCompletions, activeDays, maxInDay, currentStreak };
  }, [activityMap]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Activity</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>
            <strong className="text-gray-900">{stats.totalCompletions}</strong>{" "}
            completions
          </span>
          <span>
            <strong className="text-gray-900">{stats.activeDays}</strong> active
            days
          </span>
          <span>
            <strong className="text-gray-900">{stats.currentStreak}</strong> day
            streak
          </span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex text-xs text-gray-400 mb-1 ml-8">
        {calendarData.months.map(({ month, weekIndex }, idx) => (
          <span
            key={`${month}-${weekIndex}`}
            className="absolute"
            style={{ left: `${weekIndex * 14 + 32}px` }}
          >
            {month}
          </span>
        ))}
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2 relative">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 text-xs text-gray-400 pr-2 shrink-0">
          {DAYS_OF_WEEK.map((day, idx) => (
            <div
              key={day}
              className={`h-3 flex items-center ${
                idx % 2 === 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-0.5 relative">
          {/* Month labels positioned above the grid */}
          <div className="absolute -top-5 left-0 flex text-xs text-gray-400">
            {calendarData.months.map(({ month, weekIndex }, idx) => (
              <span
                key={`${month}-${idx}`}
                className="absolute whitespace-nowrap"
                style={{ left: `${weekIndex * 14}px` }}
              >
                {month}
              </span>
            ))}
          </div>

          {calendarData.weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-0.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-3 h-3 rounded-sm cursor-pointer transition-all relative
                    ${day.isFuture ? "bg-transparent" : getColorClass(day.count)}
                    ${day.isToday ? "ring-1 ring-gray-400" : ""}
                    ${!day.isFuture ? "hover:ring-1 hover:ring-gray-500" : ""}
                  `}
                  onMouseEnter={() => !day.isFuture && setHoveredCell(day)}
                  onMouseLeave={() => setHoveredCell(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div className="mt-2 text-xs text-gray-600">
          <strong>
            {new Date(hoveredCell.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </strong>
          : {hoveredCell.count} completion{hoveredCell.count !== 1 ? "s" : ""}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-3 text-xs text-gray-500">
        <span>Less</span>
        {getLegendColors().map(({ label, class: colorClass }) => (
          <div
            key={label}
            className={`w-3 h-3 rounded-sm ${colorClass}`}
            title={label}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
