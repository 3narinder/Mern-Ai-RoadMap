const Tabs = ({ phasesData, setPhase, phase }) => {
  return (
    <div className="w-full mx-auto px-4 flex gap-3 py-4">
      {phasesData.map((p) => (
        <button
          key={p.id}
          onClick={() => setPhase(p.id)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
            phase === p.id
              ? "bg-gray-900 text-white"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          {p.label} — {p.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
