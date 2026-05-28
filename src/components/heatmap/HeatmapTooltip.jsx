const HeatmapTooltip = ({ hoveredCell, tooltipPosition }) => {
  if (!hoveredCell) return null;

  return (
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
  );
};

export default HeatmapTooltip;
