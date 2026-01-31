import Spinner from "@/components/ui/Spinner";

export default function GlobalLoading() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Spinner />
    </div>
  );
}
