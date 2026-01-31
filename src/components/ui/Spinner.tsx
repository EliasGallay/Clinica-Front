export default function Spinner() {
  return (
    <div
      aria-label="loading"
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "3px solid rgba(0,0,0,0.15)",
        borderTopColor: "rgba(0,0,0,0.65)",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}
