import { useState } from "react";
import { DIFF_STYLE } from "../data/roadmap-data";
import Tick from "./Tick";
import { useChecks } from "../Hooks/useChecks";
import { getDateRange, formatDateShort } from "../utils/check-helpers";

const DailyWorkCard = ({ dsa }) => {
  const [open, setOpen] = useState(false);
  const {
    isChecked,
    toggle,
    countChecked,
    pctComplete,
    checkAll,
    uncheckAll,
    allChecked,
    getCompletionDate,
    completionDates,
  } = useChecks();

  const ids = dsa.topics.map((t) => t.id);
  const done = countChecked(ids);
  const pct = pctComplete(ids);
  const completed = allChecked(ids);
  const dateRange = getDateRange(completionDates, ids, completed);

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
      {/* header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-start gap-4 px-5 py-4 text-left cursor-pointer ${
          completed ? "" : "hover:bg-gray-50"
        }`}
      >
        <span className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
          {dsa.week}
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{dsa.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{dsa.pattern}</p>
          {dsa.level && (
            <p className="text-[11px] text-gray-500 mt-0.5">{dsa.level}</p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* bulk toggle */}

          {dateRange && (
            <p className="text-xs text-emerald-600 font-medium">{dateRange}</p>
          )}
          <div
            onClick={handleBulk}
            className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded px-2 py-0.5 transition-colors"
          >
            {completed ? "Uncheck all" : "Check all"}
          </div>

          <span className="text-xs text-gray-500">{pct}%</span>

          <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-800 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>

          <span className="text-xs text-gray-400">
            {done}/{ids.length}
          </span>

          <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {/* expanded topics */}
      {open && (
        <div className="px-4 py-2 border-t border-gray-100">
          {dsa.topics.map((t) => {
            const completionDate = getCompletionDate(t.id);
            const checked = isChecked(t.id);

            return (
              <label
                key={t.id}
                className={`flex items-center gap-2.5 py-1.5 px-1 rounded cursor-pointer hover:bg-gray-50 ${
                  checked ? "opacity-40" : ""
                }`}
              >
                <Tick on={checked} toggle={() => toggle(t.id)} />

                <span
                  className={`text-sm flex-1 ${
                    checked ? "line-through text-gray-400" : "text-gray-700"
                  }`}
                >
                  {t.text}
                </span>

                {/* Show completion date if completed */}
                {checked && completionDate && (
                  <span className="text-xs text-gray-400 mr-2">
                    {formatDateShort(completionDate)}
                  </span>
                )}

                <span
                  className={`text-xs font-medium ${
                    DIFF_STYLE[t.diff] || "text-gray-400"
                  }`}
                >
                  {t.diff}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DailyWorkCard;
