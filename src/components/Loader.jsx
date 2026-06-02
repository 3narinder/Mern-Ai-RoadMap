const Loader = () => {
  return (
    <div className="relative inline-block h-12 w-12 align-[-0.125em]">
      <div
        className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-magenta-500 p-1 animate-spin"
        role="status"
      >
        <div className="h-full w-full rounded-full bg-transparent"></div>
      </div>
    </div>
  );
};

export default Loader;
