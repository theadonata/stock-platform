---
status: accepted
---

# Tech stack: match the sibling repos exactly

Backend: FastAPI + PostgreSQL + SQLAlchemy/Alembic + Pydantic (Python 3.12), identical to stock-backend. Frontend: React 19 + TypeScript + Vite + TanStack Query + Tailwind, identical to stock-frontend. We picked sameness over a stack better-suited in isolation to a dashboard/orchestrator (e.g. Next.js for SSR, or a Node backend) because every consumer of this app already knows this exact stack, and the existing CI tooling (SonarCloud, ruff, eslint, pytest, Vitest) transfers with zero new setup.

Two additions beyond what siblings need, both deliberately kept minimal: an in-process APScheduler job (not Celery/Redis) inside the FastAPI app handles webhook-driven and polled sync (Jira, GitHub, ArgoCD, Prometheus) into Postgres, matching the Sync State model from CONTEXT.md; GitHub OAuth (via Authlib) plus a platform-issued JWT (python-jose, the same library stock-backend already depends on) handles SSO and the Admin/Approver/Viewer role checks.

## Considered Options

- **Next.js (unified frontend+backend, SSR)**: rejected — a second frontend paradigm for the team to hold in their heads alongside stock-frontend's Vite/React setup, for a dashboard that has no SSR requirement.
- **Celery + Redis for background sync jobs**: rejected as overkill for a handful of scheduled polls and webhook handlers at this scale; revisit if job volume grows enough to need real queueing/retries.

## Consequences

- Deployment follows the same path as stock-hpp: a new Helm chart (`stock-platform`) gets added to stock-infrastructure's `charts/`, not to this repo, deployed via the existing ArgoCD GitOps flow. Owning the chart in stock-infrastructure rather than here matches how stock-backend/stock-frontend are deployed today.
