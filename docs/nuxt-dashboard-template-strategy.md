# Nuxt dashboard template strategy

AGenNext Agent-Dashboard should use the Nuxt UI dashboard template as its frontend foundation.

Source template:

```txt
https://github.com/nuxt-ui-templates/dashboard
```

## Decision

Use the Nuxt UI dashboard template for the Agent-Dashboard operator/admin interface.

Agent-Dashboard owns operational visibility and administration. It should not own runtime execution, graph execution, Kubernetes operations, or provider adapters.

## Why this template

The template already provides:

- multi-page dashboard layout
- collapsible sidebar
- keyboard shortcuts
- command palette
- light/dark mode
- admin-style navigation
- Nuxt UI component foundation

## AGenNext integration

```txt
Agent-Dashboard UI
  ↓
Agent-Runtime / SurrealDB read APIs
  ↓
Runtime state, workflows, actions, traces
  ↓
AgentKube / provider status
```

## Boundary

| Component | Responsibility |
|---|---|
| Agent-Dashboard | Runtime/admin/operator UI |
| Agent-Chat | Conversation UX |
| Agent-Runtime | Execution backend and runtime profiles |
| AgentGraph | Graph contracts and future-native graph runtime |
| LangGraph | Current workflow execution framework |
| SurrealDB | Memory, state, graph, events, audit |
| AgentKube | Kubernetes operations |
| Agent-Identity | Identity, DID, VC, approvals |

## Dashboard responsibilities

Agent-Dashboard should show:

- runtime health
- active workflows
- pending approvals
- action queue
- AgentGraph runs
- SurrealDB memory/status summaries
- infrastructure graph
- Kubernetes cluster state
- worker status
- audit logs
- traces and incidents
- provider inventory

## Runtime interaction model

```txt
Operator opens dashboard
  ↓
Dashboard reads runtime state
  ↓
SurrealDB / Agent-Runtime exposes workflows, actions, logs
  ↓
Operator approves, pauses, retries, or inspects runs
  ↓
Agent-Runtime executes changes
```

## Rule

Agent-Dashboard is an operator console.

Agent-Chat is a conversation interface.

Agent-Runtime remains the execution system.
