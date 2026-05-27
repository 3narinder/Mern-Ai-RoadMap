const Tick = ({ on, toggle }) => {
  return (
    <button
      onClick={toggle}
      className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors
        ${on ? "bg-gray-800 border-gray-800" : "bg-white border-gray-300 hover:border-gray-500"}`}
    >
      {on && (
        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default Tick;
