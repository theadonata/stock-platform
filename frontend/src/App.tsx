import { useQuery } from "@tanstack/react-query";
import { fetchHealth } from "./api/health";

// Proves the frontend/backend plumbing works end-to-end: calls the
// backend's health-check endpoint and renders the result. Replaced by the
// real dashboard shell once auth & roles land.
export function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-slate-900">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">STOCK Platform</h1>
        {isLoading && <p className="mt-2 text-slate-500">Checking backend health…</p>}
        {isError && <p className="mt-2 text-red-600">Backend unreachable</p>}
        {data && <p className="mt-2 text-green-600">Backend status: {data.status}</p>}
      </div>
    </main>
  );
}
