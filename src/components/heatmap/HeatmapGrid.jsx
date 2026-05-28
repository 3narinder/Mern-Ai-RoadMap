import { DAYS_OF_WEEK } from "../../utils/heatmap-utils";
import WeekColumn from "./WeekColumn";

const HeatmapGrid = ({ calendarData, onMouseEnter, onMouseLeave }) => {
  return (
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
          {/* Month row */}
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
              <WeekColumn
                key={weekIdx}
                week={week}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapGrid;
