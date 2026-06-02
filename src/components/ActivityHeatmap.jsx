import { useMemo, useState } from "react";
import {
  buildActivityMap,
  calculateStats,
  generateCalendarData,
} from "../utils/heatmap-utils";
import HeatmapHeader from "./heatmap/HeatmapHeader";
import HeatmapGrid from "./heatmap/HeatmapGrid";
import HeatmapTooltip from "./heatmap/HeatmapTooltip";
import HeatmapLegend from "./heatmap/HeatmapLegend";

const ActivityHeatmap = ({ dailyActivity }) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Build activity map directly from dailyActivity source of truth
  const activityMap = useMemo(
    () => buildActivityMap(dailyActivity),
    [dailyActivity],
  );

  // Generate calendar grid for the last 365 days
  const calendarData = useMemo(
    () => generateCalendarData(activityMap),
    [activityMap],
  );

  // Calculate stats
  const stats = useMemo(() => calculateStats(activityMap), [activityMap]);

  console.log(stats);

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
      <HeatmapHeader stats={stats} />
      <HeatmapGrid
        calendarData={calendarData}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHoveredCell(null)}
      />
      <HeatmapTooltip
        hoveredCell={hoveredCell}
        tooltipPosition={tooltipPosition}
      />
      <HeatmapLegend />
    </div>
  );
};

export default ActivityHeatmap;
