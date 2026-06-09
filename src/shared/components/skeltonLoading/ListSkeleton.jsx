const style = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%"
}

export default function ListSkeleton({
  count = 10
}) {
  return (
    <div className="shimmer-grid" style={style}>
      {Array.from({ length: count }).map((i) => (
        <div key={i} className="shimmer" style={{ height: "50px" }} />
      ))}
    </div>
  );
};