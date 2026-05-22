export default function IdentityTable({ identities }) {
  return (
    <div className="panel">
      <div className="panel-title">Agent Identity</div>
      <table className="table">
        <thead>
          <tr>
            <th>Identity</th>
            <th>Subject</th>
            <th>DID</th>
            <th>OIDC Issuer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {identities.map((identity) => (
            <tr key={identity.id}>
              <td>{identity.id}</td>
              <td>{identity.subject}</td>
              <td>{identity.did}</td>
              <td>{identity.oidcIssuer}</td>
              <td>{identity.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
