import { useState } from "react";
import ModuleCard from "./ModuleCard";
import { useChecks } from "../Hooks/useChecks";

const WeekCard = ({ week, modules }) => {
  const [open, setOpen] = useState(false);

  const [activeModule, setActiveModule] = useState(null);

  const { countChecked, pctComplete, checkAll, uncheckAll, allChecked } =
    useChecks();

  const ids = modules.flatMap((m) => m.topics.map((t) => t.id));
  const done = countChecked(ids);
  const pct = pctComplete(ids);
  const completed = allChecked(ids);

  function handleBulk(e) {
    e.stopPropagation();
    completed ? uncheckAll(ids) : checkAll(ids);
  }

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-colors duration-300 ${
        completed ? "border-green-400 bg-green-100" : "border-gray-200 bg-white"
      }`}
    >
      {/* header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-start gap-4 px-5 py-4 text-left cursor-pointer completed ? "" : "hover:bg-gray-50"
      }`}
      >
        <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
          W{week.n}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{week.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">🎯 {week.milestone}</p>
          <p className="text-xs text-gray-500 mt-0.5">🚀 {week.outcome}</p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* bulk toggle */}
          <div
            onClick={handleBulk}
            className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded px-2 py-0.5 transition-colors"
          >
            {completed ? "Uncheck all" : "Check all"}
          </div>

          <span className="text-xs font-semibold text-gray-600">{pct}%</span>

          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-800 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>

          <span className="text-xs text-gray-400">
            {done}/{ids.length}
          </span>

          <span className="text-gray-400 text-sm">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {/* expanded body */}
      {open && (
        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50 space-y-3">
          {modules.map((m) => (
            <ModuleCard
              key={m.id}
              mod={m}
              open={activeModule === m.id}
              onToggle={() =>
                setActiveModule((prev) => (prev === m.id ? null : m.id))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeekCard;
