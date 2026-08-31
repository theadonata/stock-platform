---
status: accepted
---

# Platform shape and scope: dashboard + orchestrator, config-layer from day one

The ADR→Jira-subtask handoff was manual and untracked, and dev-workflow state (ADRs, Jira, PRs) lived apart from ops/infra state (ArgoCD, Prometheus) across five separate tools with no shared view. We're building stock-platform as a new standalone app — both a dashboard (unifying dev-workflow and ops/infra visibility) and an orchestrator (closing the one real automation gap: ADR approval now auto-files Jira subtasks with no human checkpoint) — rather than bolting either half onto an existing repo.

STOCK is the first configured tenant, not a hardcoded assumption: the data model, GitHub OAuth SSO, and Admin/Approver/Viewer roles are generic from the start so a second Jira project could onboard later without a rewrite.

The autonomy gate set by stock-infrastructure's ADR-0007 carries over unchanged: everything through draft-PR creation and subtask filing can run without a human, but merging to main and any production-infra action still requires an explicit Approver click. The existing hourly Jira→PR trigger is left untouched — this app displays its status rather than absorbing it, so two systems aren't racing to own the same job while this one is unproven.

## Considered Options

- **Live API pulls instead of synced state**: rejected — slower dashboard, source-API rate-limit risk, and no history without extra plumbing. Chose webhook/poll-synced local state instead, which gives history for free.
- **Full immutable audit log**: rejected as over-engineering for a small trusted team; a lightweight activity feed covers the actual need (see CONTEXT.md).
- **Absorbing the existing Jira→PR trigger**: rejected for now — coexistence avoids migrating a working system while the new app is unproven.

## Consequences

- Hosting follows the same GitOps pattern as everything else (Helm + ArgoCD on the existing cluster), which means this app shares fate with the infra it's meant to help observe — an outage there can take down the tool you'd use to diagnose it. Accepted as a known trade-off, not revisited here.
