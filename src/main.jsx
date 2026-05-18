import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

function SignalCard({ title, signal }) {
  if (!signal) return null
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, flex: 1 }}>
      <h3>{title}</h3>
      <p><strong>Status:</strong> {signal.status}</p>
      {'score' in signal && <p><strong>Score:</strong> {signal.score}</p>}
      {'estimated_cost_usd' in signal && <p><strong>Estimated cost:</strong> ${signal.estimated_cost_usd}</p>}
      {'budget_status' in signal && <p><strong>Budget:</strong> {signal.budget_status}</p>}
      <p>{signal.summary}</p>
    </div>
  )
}

function App() {
  const [health, setHealth] = useState(null)
  const [result, setResult] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [approvalNotes, setApprovalNotes] = useState('')
  const [approvalResult, setApprovalResult] = useState(null)

  const [form, setForm] = useState({
    task_id: 'test-1',
    objective: 'Verify end-to-end runtime',
    scope: 'Dashboard smoke test',
    metadata: {}
  })

  const api = import.meta.env.VITE_AGENT_KNOWLEDGE_API_URL || 'http://localhost:8001'

  async function checkHealth() {
    const res = await fetch(`${api}/health`)
    setHealth(await res.json())
  }

  async function fetchEvents(taskId) {
    const res = await fetch(`${api}/objectives/${taskId}/events`)
    setEvents(await res.json())
  }

  async function runObjective() {
    setLoading(true)
    setEvents([])
    setApprovalResult(null)
    const res = await fetch(`${api}/objectives/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setResult(data)
    await fetchEvents(form.task_id)
    setLoading(false)
  }

  async function submitApproval(decision) {
    const res = await fetch(`${api}/objectives/${form.task_id}/approval`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        decision,
        reviewer: 'dashboard-user',
        notes: approvalNotes
      })
    })
    const data = await res.json()
    setApprovalResult(data)
    await fetchEvents(form.task_id)
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1>Agent Dashboard</h1>

      <section>
        <h2>Platform Health</h2>
        <button onClick={checkHealth}>Check Health</button>
        {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
      </section>

      <section>
        <h2>Run Objective</h2>
        <label>
          Task ID
          <input value={form.task_id} onChange={(e) => setForm({ ...form, task_id: e.target.value })} />
        </label>
        <label>
          Objective
          <input value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} />
        </label>
        <label>
          Scope
          <input value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} />
        </label>
        <div style={{ marginTop: 12 }}>
          <button onClick={runObjective} disabled={loading}>
            {loading ? 'Running...' : 'Run Objective'}
          </button>
        </div>
      </section>

      {result && (
        <section>
          <h2>Run Result</h2>
          <p><strong>Ready for human review:</strong> {String(result.ready_for_human_review)}</p>
          <p><strong>Agent responses:</strong> {result.response_count}</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            <SignalCard title="Evaluation" signal={result.evaluation} />
            <SignalCard title="Trust" signal={result.trust} />
            <SignalCard title="FinOps" signal={result.finops} />
          </div>
          <details style={{ marginTop: 16 }}>
            <summary>Raw response</summary>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </details>
        </section>
      )}

      {result && (
        <section>
          <h2>Human Approval</h2>
          <textarea
            rows="4"
            style={{ width: '100%' }}
            placeholder="Optional approval notes"
            value={approvalNotes}
            onChange={(e) => setApprovalNotes(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button onClick={() => submitApproval('approved')}>Approve</button>
            <button onClick={() => submitApproval('rejected')}>Reject</button>
            <button onClick={() => submitApproval('changes_requested')}>Request Changes</button>
          </div>
          {approvalResult && <pre>{JSON.stringify(approvalResult, null, 2)}</pre>}
        </section>
      )}

      <section>
        <h2>Runtime Timeline</h2>
        {events.length === 0 && <p>No events loaded yet.</p>}
        {events.map((event) => (
          <div key={event.event_id} style={{ borderLeft: '3px solid #999', paddingLeft: 12, marginBottom: 12 }}>
            <strong>{event.event_type}</strong>
            <div>{event.created_at}</div>
            <pre>{JSON.stringify(event, null, 2)}</pre>
          </div>
        ))}
      </section>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
