export default function GovernanceTimeline({ events }) {
  return (
    <div className="panel">
      <div className="panel-title">Governance Timeline</div>
      <div className="timeline">
        {events.map((event) => (
          <div className="timeline-event" key={event.id}>
            <div className="timeline-type">{event.type}</div>
            <div className="timeline-message">{event.message}</div>
            <div className="timeline-meta">
              <span>{event.actor}</span>
              <span>{event.at}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
