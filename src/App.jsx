import MetricCard from './components/MetricCard.jsx';
import RuntimeRunsTable from './components/RuntimeRunsTable.jsx';
import IdentityTable from './components/IdentityTable.jsx';
import RegistryTable from './components/RegistryTable.jsx';
import GovernanceTimeline from './components/GovernanceTimeline.jsx';
import KillSwitchPanel from './components/KillSwitchPanel.jsx';
import {
  accessDecisions,
  governanceEvents,
  identityRecords,
  killSwitches,
  platformMetrics,
  registryEntries,
  runtimeRuns
} from './data/platformData.js';

function AccessDecisionTable({ decisions }) {
  return (
    <div className="panel">
      <div className="panel-title">Access Decisions</div>
      <table className="table">
        <thead>
          <tr>
            <th>Run</th>
            <th>Resource</th>
            <th>Action</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {decisions.map((decision) => (
            <tr key={decision.id}>
              <td>{decision.run}</td>
              <td>{decision.resourceType}:{decision.resource}</td>
              <td>{decision.action}</td>
              <td>{decision.decision}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">AGenNext</div>
        <nav className="nav">
          <a href="#overview">Overview</a>
          <a href="#runtime">Runtime</a>
          <a href="#identity">Identity</a>
          <a href="#registry">Registry</a>
          <a href="#governance">Governance</a>
        </nav>
      </aside>

      <section className="content">
        <header className="hero" id="overview">
          <div>
            <p className="eyebrow">Agent Platform Control Center</p>
            <h1>Agent Dashboard</h1>
            <p>
              Visibility and control for runtime governance, identity, registry publication,
              access decisions, kill switches, and audit events.
            </p>
          </div>
          <div className="hero-status">Live-ready UI shell</div>
        </header>

        <section className="metric-grid">
          {platformMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid two" id="runtime">
          <RuntimeRunsTable runs={runtimeRuns} />
          <KillSwitchPanel switches={killSwitches} />
        </section>

        <section className="grid" id="identity">
          <IdentityTable identities={identityRecords} />
        </section>

        <section className="grid" id="registry">
          <RegistryTable entries={registryEntries} />
        </section>

        <section className="grid two" id="governance">
          <AccessDecisionTable decisions={accessDecisions} />
          <GovernanceTimeline events={governanceEvents} />
        </section>
      </section>
    </main>
  );
}
