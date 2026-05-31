// HeatmapHeader.jsx
const HeatmapHeader = ({ stats }) => {
  // Ensure we safely extract values or default them to 0 if NaN/undefined occurs
  const totalCompletions = Number.isNaN(stats?.totalCompletions)
    ? 0
    : stats?.totalCompletions || 0;
  const activeDays = Number.isNaN(stats?.activeDays)
    ? 0
    : stats?.activeDays || 0;
  const currentStreak = Number.isNaN(stats?.currentStreak)
    ? 0
    : stats?.currentStreak || 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <h3 className="font-semibold text-gray-900 text-base">Activity</h3>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span>
          <strong className="text-gray-900">{totalCompletions}</strong>{" "}
          completions
        </span>
        <span>
          <strong className="text-gray-900">{activeDays}</strong> active days
        </span>
        <span>
          <strong className="text-gray-900">{currentStreak}</strong> day streak
        </span>
      </div>
    </div>
  );
};

export default HeatmapHeader;
