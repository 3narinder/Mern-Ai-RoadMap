import { TAG_STYLE } from "../data/roadmap-data";
import Tick from "./Tick";
import { useChecks } from "../Hooks/useChecks";
import { getDateRange, formatDateShort } from "../utils/check-helpers";

const ModuleCard = ({ mod, open, onToggle }) => {
  const {
    isChecked,
    toggle,
    pctComplete,
    countChecked,
    checkAll,
    uncheckAll,
    allChecked,
    getCompletionDate,
    completionDates,
  } = useChecks();

  const ids = mod.topics.map((t) => t.id);
  const done = countChecked(ids);
  const pct = pctComplete(ids);
  const complete = allChecked(ids);
  const dateRange = getDateRange(completionDates, ids, complete);

  function handleBulk(e) {
    e.stopPropagation();
    complete ? uncheckAll(ids) : checkAll(ids);
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      {/* header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 text-left"
      >
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded ${
            TAG_STYLE[mod.tag] || "bg-gray-100 text-gray-700"
          }`}
        >
          {mod.tag}
        </span>

        <span className="text-xs text-gray-400">{mod.level}</span>
        <span className="flex-1 font-semibold text-gray-900 text-sm">
          {mod.title}
        </span>

        {/* Date range if started */}
        {dateRange && (
          <span className="text-xs text-emerald-600 font-medium mr-2">
            {dateRange}
          </span>
        )}

        {/* bulk toggle */}
        <div
          onClick={handleBulk}
          className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded px-2 py-0.5 transition-colors mr-1"
        >
          {complete ? "Uncheck all" : "Check all"}
        </div>

        <span className="text-xs text-gray-400">
          {done}/{ids.length}
        </span>
        <span className="text-gray-400 text-xs ml-1">{open ? "▲" : "▼"}</span>
      </button>

      {/* progress bar */}
      <div className="h-0.5 bg-gray-100">
        <div
          className="h-full bg-gray-800 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* body */}
      {open && (
        <div className="px-3 py-2">
          {/* resources */}
          {mod.resources?.length > 0 && (
            <div className="mb-2.5 border border-gray-100 rounded bg-gray-50 px-3 py-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Resources
              </p>
              {mod.resources.map((r, i) => (
                <div key={i} className="flex gap-2 text-xs py-0.5">
                  <span className="font-medium text-gray-800 shrink-0">
                    {r.label}
                  </span>
                  <span className="text-gray-300">-</span>
                  <span className="text-gray-500">{r.note}</span>
                </div>
              ))}
            </div>
          )}

          {/* topics */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 px-1">
            Topics{" "}
            <span className="text-amber-500 font-normal ml-1 normal-case">
              * = interview topic
            </span>
          </p>

          {mod.topics.map((t) => {
            const completionDate = getCompletionDate(t.id);
            const checked = isChecked(t.id);

            return (
              <label
                key={t.id}
                className={`flex items-start gap-2.5 py-1.5 px-2 rounded cursor-pointer hover:bg-gray-50 ${
                  checked ? "opacity-40" : ""
                }`}
              >
                <Tick on={checked} toggle={() => toggle(t.id)} />

                <span
                  className={`text-sm leading-snug flex-1 ${
                    checked ? "line-through text-gray-400" : "text-gray-700"
                  }`}
                >
                  {t.interview && (
                    <span className="text-amber-500 mr-1 text-xs">*</span>
                  )}
                  {t.text}
                </span>

                {/* Show completion date if completed */}
                {checked && completionDate && (
                  <span className="text-xs text-gray-400 shrink-0">
                    {formatDateShort(completionDate)}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
