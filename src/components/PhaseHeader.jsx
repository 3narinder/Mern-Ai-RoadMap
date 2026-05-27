const PhaseHeader = ({ border, badge, phase }) => {
  return (
    <div
      className={`rounded-xl border px-4 py-3 mb-5 flex items-center gap-3 ${border[phase.id]}`}
    >
      <span
        className={`px-3 py-1 rounded-md text-xs font-bold ${badge[phase.id]}`}
      >
        {phase.label}
      </span>
      <div>
        <p className="font-bold text-gray-900 text-sm">{phase.title}</p>
        <p className="text-xs text-gray-500">{phase.subtitle}</p>
      </div>
    </div>
  );
};

export default PhaseHeader;
