import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const [health, setHealth] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    task_id: 'test-1',
    objective: 'Verify end-to-end runtime',
    scope: 'Dashboard smoke test',
    metadata: {}
  })

  const api = 'http://localhost:8001'

  async function checkHealth() {
    const res = await fetch(`${api}/health`)
    setHealth(await res.json())
  }

  async function runObjective() {
    setLoading(true)
    const res = await fetch(`${api}/objectives/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setResult(await res.json())
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
        <button onClick={runObjective} disabled={loading}>
          {loading ? 'Running...' : 'Run Objective'}
        </button>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </section>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
