import { memo } from "react";
import { getColorClass } from "../../utils/heatmap-utils";

const GridCell = memo(({ day, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`w-3.5 h-3.5 rounded-xs border cursor-pointer transition-all duration-150 hover:scale-125 hover:z-10
        ${day.isFuture ? "bg-transparent border-transparent pointer-events-none" : getColorClass(day.count)}
        ${day.isToday ? "ring-2 ring-gray-400 ring-offset-1" : ""}
      `}
      onMouseEnter={(e) => onMouseEnter(e, day)}
      onMouseLeave={onMouseLeave}
    />
  );
});

GridCell.displayName = "GridCell";

export default GridCell;
