// Backend base URL: VITE_API_BASE_URL matters only for `npm run dev`/`vite
// preview` — deployed environments will inject their own config the same
// way stock-frontend's client.ts does, once this app has more than one
// endpoint to call (see auth & roles ticket).
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

export interface HealthStatus {
  status: string;
}

// /healthz lives outside the /api/v1 prefix (same as stock-backend), so it's
// fetched directly rather than through a shared, prefixed API client.
export async function fetchHealth(): Promise<HealthStatus> {
  const response = await fetch(`${BASE_URL}/healthz`);
  if (!response.ok) {
    throw new Error(`Health check failed (${response.status})`);
  }
  return (await response.json()) as HealthStatus;
}
