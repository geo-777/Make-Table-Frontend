// Reusable shimmer placeholder grid component
// Thisss is for setting up

// note: columns here is not always accurate.
export default function Shimmer({
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
