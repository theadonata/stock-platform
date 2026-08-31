---
status: accepted
---

# AI-assisted fix proposals: propose-only, two independent signal paths

We're adding AI-driven diagnosis to the platform: Claude watches app error logs and infra/ops signals (Prometheus/ArgoCD) and produces a Diagnosis + Fix Proposal for each detected issue. The AI never applies a fix itself — every Fix Proposal sits behind the existing Autonomy Gate (ADR-0007/ADR-0001) and requires an explicit Approver click, exactly like every other action past that boundary. No exception to the gate was needed or created; a full-autonomy option (AI applies fixes directly) was considered and rejected specifically because it would require revising that governance decision, not just adding a feature, and the cost of a wrong auto-applied infra action is asymmetric with the benefit of skipping one click.

Two independent pipelines, not one unified feature — different signal sources, different risk profiles, different Fix Proposal shapes:

- **App-level**: application error logs (stock-backend, stock-frontend, and this platform's own future logs) → Diagnosis → a draft PR, the same artifact shape as the existing external Jira→PR trigger, just diagnosis-triggered instead of ticket-triggered.
- **Infra-level**: Prometheus/ArgoCD signals (pod crashes, sync failures, resource pressure — the exact category of issues that cost real time in this project before) → Diagnosis → a proposed infra/config change (e.g. a Helm values diff, a rollback target) surfaced for manual review and application, not an automated PR.

Both pipelines share one thing: the Claude API client wrapper from ADR-0002 (Sonnet 5 default, per-call override). Producing a useful Diagnosis requires Claude to gather context — read the relevant logs, read code, query the platform's own Jira/GitHub/ArgoCD sync-state — so the wrapper includes tool-use scaffolding (Claude API + Tool Runner) from the start. This supersedes the "basic wrapper only" scope from ADR-0002's discussion: that was the right call before a concrete feature existed, but tool-use is now a real requirement, not speculative readiness.

## Considered Options

- **Full autonomous auto-apply**: rejected — see above. Revisit only as a separate, deliberate ADR if a narrow, pre-approved allowlist of safe/reversible actions (e.g. restart a crashlooping pod) is ever proposed; that is a distinct decision from this one.
- **One unified diagnosis pipeline for both signal types**: rejected — app logs and infra signals have different sources, different Fix Proposal shapes (PR vs. config diff), and different reviewers in practice. Sharing only the client wrapper keeps each pipeline simple.

## Consequences

- Left open for implementation, not blocking this decision: the concrete log source per environment (CloudWatch Logs on AWS per stock-infrastructure's ADR-0008; the homelab/k3s equivalent is unresolved), whether Diagnosis/Fix Proposal get dedicated tables or reuse the Sync State model, and whether a ready Fix Proposal triggers a Discord notification matching the existing pattern.
