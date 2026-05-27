import {
  DSA,
  MODULES,
  PHASE_BADGE,
  PHASE_BORDER,
  PHASES,
  WEEKS,
} from "./data/roadmap-data";
import { useState } from "react";
import WeekCard from "./components/WeekCard";
import DSACard from "./components/DSACard";
import PhaseHeader from "./components/PhaseHeader";
import Footer from "./components/Footer";
import Tabs from "./components/Tabs";
import Header from "./components/Header";
import { useChecks } from "./Hooks/useChecks";

// ─── Inner app — has access to CheckContext ───────────────────
const RoadmapApp = () => {
  const [phase, setPhase] = useState("p1");
  const { checks, toggle, countChecked, loading, clearAll } = useChecks();

  const allIds = [
    ...MODULES.flatMap((m) => m.topics.map((t) => t.id)),
    ...DSA.flatMap((d) => d.topics.map((t) => t.id)),
  ];

  const totalDone = countChecked(allIds);
  const totalPct = allIds.length
    ? Math.round((totalDone / allIds.length) * 100)
    : 0;

  const activePhase = PHASES.find((p) => p.id === phase);
  const activeWeeks = activePhase?.weeks ?? [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading progress…</p>
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

        {/* DSA tab */}
        {phase === "dsa" && (
          <div className="space-y-3">
            {DSA.map((dsa) => (
              <DSACard key={dsa.id} dsa={dsa} checks={checks} toggle={toggle} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RoadmapApp;
