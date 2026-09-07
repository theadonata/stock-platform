import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import * as healthApi from "./api/health";

// Renders the app with a fresh QueryClient per test so cached results from
// one test don't leak into the next.
function renderApp() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}

describe("App", () => {
  it("renders the backend health status once the check resolves", async () => {
    vi.spyOn(healthApi, "fetchHealth").mockResolvedValue({ status: "ok" });

    renderApp();

    await waitFor(() => expect(screen.getByText(/Backend status: ok/i)).toBeInTheDocument());
  });

  it("shows an error state when the backend is unreachable", async () => {
    vi.spyOn(healthApi, "fetchHealth").mockRejectedValue(new Error("network error"));

    renderApp();

    await waitFor(() => expect(screen.getByText(/Backend unreachable/i)).toBeInTheDocument());
  });
});
