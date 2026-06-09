const style = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)",
  gap: "1rem",
};

export default function GridSkelton({
  count = 6,
  className = "",
  height = 185,
}) {
  return (
    <div className={className} style={style}>
      {Array.from({ length: count }).map((i) => (
        <div
          key={i}
          className="shimmer"
          style={{
            height: typeof height === "number" ? `${height}px` : height,
          }}
        />
      ))}
    </div>
  );
}
