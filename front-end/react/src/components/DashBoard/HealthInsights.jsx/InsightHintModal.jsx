export default function InsightHintModal({ suggestion }) {
  return (
    <div className="insight-hint-modal">
      <h3>{suggestion.message}</h3>
    </div>
  );
}
