import { useMemo, useState } from "react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
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
const getColorClass = (count) => {
  if (count === 0) return "bg-gray-100 border-gray-200";
  if (count === 1) return "bg-emerald-200 border-emerald-300";
  if (count <= 3) return "bg-emerald-400 border-emerald-500";
  if (count <= 6) return "bg-emerald-500 border-emerald-600";
  return "bg-emerald-600 border-emerald-700";
};

const getLegendColors = () => [
  { label: "None", class: "bg-gray-100 border border-gray-200" },
  { label: "1", class: "bg-emerald-200 border border-emerald-300" },
  { label: "2-3", class: "bg-emerald-400 border border-emerald-500" },
  { label: "4-6", class: "bg-emerald-500 border border-emerald-600" },
  { label: "7+", class: "bg-emerald-600 border border-emerald-700" },
];

const ActivityHeatmap = ({ dailyActivity = [] }) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Build activity map directly from dailyActivity source of truth
  const activityMap = useMemo(() => {
    const map = {};
    if (Array.isArray(dailyActivity)) {
      dailyActivity.forEach(({ date, count }) => {
        // Enforce counts never drop below zero
        map[date] = Math.max(0, count);
      });
    }
    return map;
  }, [dailyActivity]);

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
  }, [activityMap]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalCompletions = Object.values(activityMap).reduce(
      (sum, count) => sum + count,
      0,
    );
    const activeDays = Object.keys(activityMap).filter(
      (date) => activityMap[date] > 0,
    ).length;

    // Calculate streak
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
  }, [activityMap]);

  const handleMouseEnter = (e, day) => {
    if (day.isFuture) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
    setHoveredCell(day);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 select-none">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="font-semibold text-gray-900 text-base">Activity</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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

      {/* Calendar container */}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-2 min-w-full pt-2">
          {/* Day labels column */}
          <div className="flex flex-col pt-6 pr-1">
            {DAYS_OF_WEEK.map((day, idx) => (
              <div
                key={day}
                className="h-3.5 mb-0.75 flex items-center justify-end text-[10px] text-gray-400 font-medium"
                style={{ visibility: idx % 2 === 0 ? "hidden" : "visible" }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grid Container */}
          <div className="flex flex-col">
            {/* 🚀 THE FIXED MONTH ROW: Spaced columns to completely stop overlap */}
            <div className="flex gap-0.75 h-5 mb-1">
              {calendarData.months.map((monthLabel, idx) => (
                <div
                  key={idx}
                  className="w-3.5 text-[11px] text-gray-400 font-medium relative"
                >
                  {monthLabel && (
                    <span className="absolute left-0 top-0 whitespace-nowrap z-10">
                      {monthLabel}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Grid cells */}
            <div className="flex gap-0.75">
              {calendarData.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-0.75">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className={`w-3.5 h-3.5 rounded-xs border cursor-pointer transition-all duration-150 hover:scale-125 hover:z-10
                        ${day.isFuture ? "bg-transparent border-transparent pointer-events-none" : getColorClass(day.count)}
                        ${day.isToday ? "ring-2 ring-gray-400 ring-offset-1" : ""}
                      `}
                      onMouseEnter={(e) => handleMouseEnter(e, day)}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-md shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-70"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          <div className="font-semibold">
            {new Date(hoveredCell.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-gray-300">
            {hoveredCell.count} completion{hoveredCell.count !== 1 ? "s" : ""}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
        <span className="font-medium">Less</span>
        {getLegendColors().map(({ label, class: colorClass }) => (
          <div
            key={label}
            className={`w-3.5 h-3.5 rounded-xs ${colorClass}`}
            title={label}
          />
        ))}
        <span className="font-medium">More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
