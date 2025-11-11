import WaterIntakeInsight from "./WaterIntakeInsight";

export default function WaterIntakeCard() {
  return (
    <div className="water-intake-card modal">
      <div className="flex-column-container">
        <h2>Water intake</h2>
        <span>Your daily water intake</span>
      </div>

      <WaterIntakeInsight></WaterIntakeInsight>
    </div>
  );
}
