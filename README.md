# Agent Dashboard

Agent Dashboard is the visibility and control layer for AGenNext agentic systems.

## Responsibility

Agent Dashboard provides cross-repository visibility into:

- objectives
- agent/team execution
- A2A handoffs
- evaluation scores
- maturity levels
- trust/provenance status
- analytics metrics
- model routing decisions
- benchmark results
- product readiness
- launch readiness

## Consumers

- Human product owners
- Project Manager Agents
- Release Agents
- Product teams
- Enterprise admins

## Repository Boundary

```text
Agent-Dashboard
  → visualizes and controls status
  → does not own source contracts
  → consumes data from ecosystem repos
```

## Data Sources

```text
Agent-Objective   → objective status
Agent-Team        → agent execution and A2A handoffs
Agent-Eval        → evaluation scores
Agent-Trust       → trust and provenance
Agent-Analytics   → metrics and trends
Agent-Maturity    → readiness levels
Model-Router      → model decisions and costs
Agent-Bench       → benchmark results
Agent-Knowledge   → product workflows and artifacts
```

## Core Principle

```text
Humans need visibility before approval.
Agents need dashboards before optimization.
```

## Initial Dashboard Views

- Objective dashboard
- Agent team execution dashboard
- A2A handoff trace view
- Evaluation dashboard
- Trust/provenance dashboard
- Maturity dashboard
- Model cost/latency dashboard
- Product readiness dashboard
- Launch readiness dashboard
