import { useState, useRef, useEffect } from "react";
import ModuleCard from "./ModuleCard";
import { useChecks } from "../Hooks/useChecks";
import { getDateRange } from "../utils/check-helpers";

const WeekCard = ({ week, modules }) => {
  const [open, setOpen] = useState(false);
  const [activeModules, setActiveModules] = useState(new Set());
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  const {
    countChecked,
    pctComplete,
    checkAll,
    uncheckAll,
    allChecked,
    completionDates,
  } = useChecks();

  const ids = modules.flatMap((m) => m.topics.map((t) => t.id));
  const done = countChecked(ids);
  const pct = pctComplete(ids);
  const completed = allChecked(ids);
  const dateRange = getDateRange(completionDates, ids, completed);

  // Handle smooth height animation
  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        // Use requestAnimationFrame to ensure content is fully rendered
        const updateHeight = () => {
          if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
          }
        };
        
        // Initial measurement
        updateHeight();
        
        // Double-check after render
        const rafId = requestAnimationFrame(updateHeight);
        const timeoutId = setTimeout(updateHeight, 100);
        
        return () => {
          cancelAnimationFrame(rafId);
          clearTimeout(timeoutId);
        };
      } else {
        setHeight(0);
      }
    }
  }, [open, activeModules]);

  function handleBulk(e) {
    e.stopPropagation();
    completed ? uncheckAll(ids) : checkAll(ids);
  }

  function handleModuleToggle(moduleId) {
    setActiveModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((o) => !o);
    }
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
        onKeyDown={handleKeyPress}
        aria-expanded={open}
        aria-controls={`week-content-${week.id}`}
        className={`w-full flex items-start gap-4 px-5 py-4 text-left cursor-pointer transition-colors duration-200 ${
          completed ? "hover:bg-green-50" : "hover:bg-gray-50"
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
          {dateRange && (
            <p className="text-xs text-emerald-600 font-medium">{dateRange}</p>
          )}
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

          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* expanded body with smooth animation */}
      <div 
        id={`week-content-${week.id}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div 
          ref={contentRef}
          className="border-t border-gray-100 px-5 py-4 bg-gray-50 space-y-3"
        >
          {modules.map((m) => (
            <ModuleCard
              key={m.id}
              mod={m}
              open={activeModules.has(m.id)}
              onToggle={() => handleModuleToggle(m.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekCard;
