export default function InsightHintModal({ suggestion }) {
  return (
    <div
      style={{ border: `2px solid ${suggestion.color}` }}
      className="insight-hint-modal"
    >
      <h3>{suggestion.message}</h3>
    </div>
  );
}
