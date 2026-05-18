# Runtime Dashboard Integration

Agent-Dashboard should provide the first control surface for launching and monitoring objectives through Agent-Knowledge.

## Initial Integration

Dashboard calls:

```text
GET  Agent-Knowledge /health
POST Agent-Knowledge /objectives/run
```

## Runtime Flow

```text
Human / Project Manager Agent
  → Agent-Dashboard
  → Agent-Knowledge API
  → Agent-Frameworks runtime
  → Agent-Team orchestration
  → SurrealDB runtime state
  → readiness result
  → Dashboard status view
```

## Initial Views

### Platform Health View

Shows:

- Agent-Knowledge API health
- runtime backend status
- current environment

### Objective Runner View

Inputs:

- task_id
- objective
- scope
- metadata

Outputs:

- ready_for_human_review
- response_count
- runtime_backend

### Runtime Trace View Later

Future version should read runtime events from SurrealDB and show:

- runtime.started
- A2A handoffs
- agent responses
- blockers
- runtime.completed

## API Contract

### Health

```http
GET /health
```

Expected response:

```json
{
  "status": "ok",
  "service": "agent-knowledge",
  "runtime_backend": "surrealdb"
}
```

### Run Objective

```http
POST /objectives/run
```

Request:

```json
{
  "task_id": "test-1",
  "objective": "Verify end-to-end runtime",
  "scope": "Local smoke test",
  "metadata": {}
}
```

Response:

```json
{
  "task_id": "test-1",
  "ready_for_human_review": true,
  "response_count": 10,
  "runtime_backend": "surrealdb"
}
```

## Boundary

Agent-Dashboard owns visibility and control UX.
Agent-Knowledge owns product API.
Agent-Frameworks owns runtime adapters.
Agent-Team owns agent behavior.
SurrealDB stores runtime state.

## Final Rule

The dashboard should show humans enough evidence to approve, reject, or investigate runtime outcomes.
