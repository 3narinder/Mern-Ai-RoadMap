const Header = ({ totalDone, allIds, totalPct }) => {
  return (
    <header className="w-full px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <img
              src="/logo.png"
              alt="Roadmap Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h1 className="font-bold text-gray-900 text-xl md:text-2xl leading-tight truncate">
              MERN + AI Roadmap
            </h1>

            <p className="text-xs text-gray-500 font-medium mt-1 truncate">
              JS · TS · React · Next.js · MERN · AI · DevOps
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full transition-all duration-300"
                style={{ width: `${totalPct}%` }}
              />
            </div>

            <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
              {totalPct}%
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-md bg-gray-100 text-xs font-semibold text-gray-700">
            {totalDone}/{allIds?.length}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
