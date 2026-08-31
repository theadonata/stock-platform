# STOCK Platform

The internal app that gives the STOCK dev-workflow and ops pipeline one home: visibility across ADRs, Jira, GitHub PRs, and infra health, plus the one automation step nothing else owns (ADR → Jira subtasks).

## Language

**Tenant**:
A configured unit this platform orchestrates for — one Jira project plus its associated repo set and cluster/environment. STOCK is the first tenant.
_Avoid_: project, workspace, org

**Pipeline**:
The tracked sequence from an accepted ADR through Jira subtask filing, draft PR creation, and merge, scoped to one tenant.
_Avoid_: workflow, flow

**ADR Approval**:
An Approver accepting a submitted ADR. This is the event that fires automatic Jira subtask generation — no separate confirmation step.
_Avoid_: sign-off, review

**Subtask Generation**:
Automatic decomposition of a just-approved ADR into Jira subtasks, filed immediately with no human checkpoint.
_Avoid_: ticket creation, breakdown

**Autonomy Gate**:
The fixed boundary past which automation may not act without an explicit human Approver click. Currently: merging to main, and any production-infra action. Inherited unchanged from stock-infrastructure's ADR-0007.
_Avoid_: human-in-the-loop, approval gate

**Role**:
One of three fixed permission tiers: **Admin** (manages users and tenant config), **Approver** (holds real authority — approves ADRs, merges, production-infra actions), **Viewer** (read-only).
_Avoid_: permission level, access tier

**Activity Feed**:
A lightweight, non-authoritative record of recent actions shown per user or object. Explicitly not an audit log — no immutability or compliance guarantee.
_Avoid_: audit log, audit trail

**Sync State**:
The platform's own database, populated from Jira/GitHub/ArgoCD/Prometheus via webhooks and polling. The dashboard always reads from this, never live from the source APIs.
_Avoid_: cache, live data

**External Trigger**:
The existing hourly Jira→PR automation (`trig_0179N8uW4FxzHtfo6Eyp4qsX` in stock-infrastructure) that this platform displays but does not own or replace.
_Avoid_: job, the trigger (ambiguous once this platform has its own internal triggers)

**Diagnosis**:
An AI-generated root-cause analysis of a detected issue, produced from application error logs or infra/ops signals (Prometheus/ArgoCD). Always paired with a Fix Proposal; never surfaced alone.
_Avoid_: analysis, insight

**Fix Proposal**:
The output of a Diagnosis: either a draft PR (app-level, code fix) or a proposed infra/config change (infra-level). Always sits behind the Autonomy Gate — an Approver must explicitly apply it. The AI never auto-applies a fix.
_Avoid_: auto-fix, suggestion (too weak — this is a concrete, reviewable artifact, not a hint)
