# stock-platform

A unified dashboard + orchestrator for the STOCK dev-workflow and ops pipeline: brainstorm/grill → ADR → Jira subtasks → draft PR → merge, plus infra/ops observability (ArgoCD, Prometheus/Grafana) — in one place instead of five.

STOCK is the first configured tenant, not a hardcoded assumption; the app is designed to onboard a second Jira project/repo-set later without a rewrite.

See [`CONTEXT.md`](./CONTEXT.md) for the domain glossary, [`docs/adr/0001-platform-shape-and-scope.md`](./docs/adr/0001-platform-shape-and-scope.md) for why this exists and what it deliberately does and doesn't do, [`docs/adr/0002-tech-stack.md`](./docs/adr/0002-tech-stack.md) for the stack, and [`docs/adr/0003-ai-assisted-fix-proposals.md`](./docs/adr/0003-ai-assisted-fix-proposals.md) for the AI diagnosis/fix-proposal design.

## Stack

Backend: FastAPI + PostgreSQL + SQLAlchemy/Alembic (Python 3.12) — matches stock-backend.
Frontend: React 19 + TypeScript + Vite + TanStack Query + Tailwind — matches stock-frontend.
Auth: GitHub OAuth SSO. Sync jobs: in-process APScheduler, no external queue.
Deployment: Helm chart lives in stock-infrastructure's `charts/`, shipped via the existing ArgoCD GitOps flow.
AI: Claude API (Sonnet 5 default, configurable per call) + tool-use, wrapped in a dedicated module. Diagnoses app logs and infra/ops signals, produces Fix Proposals (draft PR or proposed infra change) — always propose-only, never auto-applied. See ADR-0003.

## Status

Design and stack settled via a grilling session. Implementation not yet started.
