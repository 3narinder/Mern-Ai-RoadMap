import GridCell from "./GridCell";

const WeekColumn = ({ week, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="flex flex-col gap-0.75">
      {week.map((day) => (
        <GridCell
          key={day.date}
          day={day}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  );
};

export default WeekColumn;
