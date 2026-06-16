import {
  MODULES,
  PHASE_BADGE,
  PHASE_BORDER,
  PHASES,
  ReactNativeRoadmap,
  WEEKS,
} from "./data/roadmap-data";
import { useState } from "react";
import WeekCard from "./components/WeekCard";
import PhaseHeader from "./components/PhaseHeader";
import Footer from "./components/Footer";
import Tabs from "./components/Tabs";
import Header from "./components/Header";
import ActivityHeatmap from "./components/ActivityHeatmap";
import { useChecks } from "./Hooks/useChecks";
import Loader from "./components/Loader";
import DailyWorkCard from "./components/DailyWorkCard";

// ─── Inner app — has access to CheckContext ───────────────────
const RoadmapApp = () => {
  const [phase, setPhase] = useState("p1");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const {
    checks,
    toggle,
    countChecked,
    loading,
    clearAll,
    completionDates,
    dailyActivity,
  } = useChecks();

  const allIds = [...MODULES.flatMap((m) => m.topics.map((t) => t.id))];

  const totalDone = countChecked(allIds);
  const totalPct = allIds.length
    ? Math.round((totalDone / allIds.length) * 100)
    : 0;

  const activePhase = PHASES.find((p) => p.id === phase);
  const activeWeeks = activePhase?.weeks ?? [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:mx-12">
      {/* sticky nav */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <Header
          allIds={allIds}
          totalPct={totalPct}
          totalDone={totalDone}
          onClear={clearAll}
        />
        <Tabs phasesData={PHASES} setPhase={setPhase} phase={phase} />
      </div>

      {/* content */}
      <div className="max-w-full mx-auto px-4 py-5">
        {/* Activity Heatmap Section */}
        <div className="mb-5">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-3 transition-colors"
          >
            <span className="text-xs">{showHeatmap ? "▼" : "▶"}</span>
            <span className="font-medium">Progress Activity</span>
          </button>

          {showHeatmap && (
            <ActivityHeatmap
              dailyActivity={dailyActivity}
              completionDates={completionDates}
            />
          )}
        </div>

        {PHASES.filter((p) => p.id === phase).map((p) => (
          <div key={p.id}>
            <PhaseHeader phase={p} border={PHASE_BORDER} badge={PHASE_BADGE} />

            {/* Week cards */}
            <div className="space-y-3">
              {activeWeeks.map((wId) => {
                const week = WEEKS.find((w) => w.id === wId);
                const mods = MODULES.filter((m) => m.weekId === wId);
                return (
                  <WeekCard
                    key={wId}
                    week={week}
                    modules={mods}
                    checks={checks}
                    toggle={toggle}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {phase === "react_native" && (
          <div className="space-y-3">
            {ReactNativeRoadmap.map((rn) => (
              <DailyWorkCard
                key={rn.id}
                dsa={rn}
                checks={checks}
                toggle={toggle}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RoadmapApp;
