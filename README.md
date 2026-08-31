# stock-platform

A unified dashboard + orchestrator for the STOCK dev-workflow and ops pipeline: brainstorm/grill → ADR → Jira subtasks → draft PR → merge, plus infra/ops observability (ArgoCD, Prometheus/Grafana) — in one place instead of five.

STOCK is the first configured tenant, not a hardcoded assumption; the app is designed to onboard a second Jira project/repo-set later without a rewrite.

See [`CONTEXT.md`](./CONTEXT.md) for the domain glossary and [`docs/adr/0001-platform-shape-and-scope.md`](./docs/adr/0001-platform-shape-and-scope.md) for why this exists and what it deliberately does and doesn't do.

## Status

Early scaffold. Design settled via a grilling session; implementation not yet started.
