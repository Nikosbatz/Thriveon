import FoodSelectionPanel from "./FoodSelectionPanel/FoodSelectionPanel";
import NutrientsTracker from "./NutrientsTracker/NutrientsTracker";
import DailyGoalTracker from "./DailyGoalTracker/DailyGoalTracker";

export default function TrackerPanel() {
  return (
    <main className="tracker-panel">
      <NutrientsTracker></NutrientsTracker>
      <DailyGoalTracker></DailyGoalTracker>
      <FoodSelectionPanel></FoodSelectionPanel>
    </main>
  );
}
