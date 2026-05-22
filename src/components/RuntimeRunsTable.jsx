export default function RuntimeRunsTable({ runs }) {
  return (
    <div className="panel">
      <div className="panel-title">Runtime Runs</div>
      <table className="table">
        <thead>
          <tr>
            <th>Run</th>
            <th>Agent</th>
            <th>Status</th>
            <th>Policy</th>
            <th>Started</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id}>
              <td>{run.id}</td>
              <td>{run.agent}</td>
              <td>{run.status}</td>
              <td>{run.policy}</td>
              <td>{run.startedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
