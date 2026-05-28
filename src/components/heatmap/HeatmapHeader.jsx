const HeatmapHeader = ({ stats }) => {
  return (
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
  );
};

export default HeatmapHeader;
