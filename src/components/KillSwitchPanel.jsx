export default function KillSwitchPanel({ switches }) {
  return (
    <div className="panel">
      <div className="panel-title">Kill Switches</div>
      <div className="kill-switch-list">
        {switches.map((item) => (
          <div className="kill-switch-item" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <div>{item.scope}</div>
            </div>
            <div className={item.active ? 'status-active' : 'status-inactive'}>
              {item.active ? 'ACTIVE' : 'INACTIVE'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
