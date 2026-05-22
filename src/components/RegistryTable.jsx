export default function RegistryTable({ entries }) {
  return (
    <div className="panel">
      <div className="panel-title">Registry Entries</div>
      <table className="table">
        <thead>
          <tr>
            <th>Registry Entry</th>
            <th>Agent</th>
            <th>Lifecycle</th>
            <th>Capabilities</th>
            <th>Identity Ref</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.agentId}</td>
              <td>{entry.lifecycle}</td>
              <td>{entry.capabilities.join(', ')}</td>
              <td>{entry.identityRef}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
