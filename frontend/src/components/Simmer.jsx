const Shimmer = ({ count }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div className="flex w-52 flex-col gap-4" key={index}>
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
