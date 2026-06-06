// Reusable grid skeleton placeholder component
// Uses the `.shimmer` class from `src/styles/global.css`.
export default function GridSkelton({
  count = 6,
  height = 120,
  columns = 3,
  gap = 16,
  className = "",
}) {
  const items = Array.from({ length: count });

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${Math.floor(100 / columns)}%, 1fr))`,
    gap: `${gap}px`,
  };

  return (
    <div className={`shimmer-grid ${className}`} style={gridStyle}>
      {items.map((_, i) => (
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
