import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const [health, setHealth] = useState(null)
  const [result, setResult] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

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
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </section>

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
