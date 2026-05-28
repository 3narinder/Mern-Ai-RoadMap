import { getLegendColors } from "../../utils/heatmap-utils";

const HeatmapLegend = () => {
  return (
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
  );
};

export default HeatmapLegend;
