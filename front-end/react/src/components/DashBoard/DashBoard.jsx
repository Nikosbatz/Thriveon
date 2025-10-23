import DailyGoalTracker from "../Tracker/DailyGoalTracker/DailyGoalTracker";
import NutrientsTracker from "../Tracker/NutrientsTracker/NutrientsTracker";
import HealthInsightsCard from "./HealthInsights.jsx/HealthInsightsCard";
import ExerciseTrackerCard from "./ExerciseTracker/ExerciseTrackerCard";
import WeightHistoryCard from "./WeightHistory/WeightHistoryCard";
export default function DashBoard() {
  return (
    <main className="dashboard">
      <div className="charts-container">
        <NutrientsTracker></NutrientsTracker>

        <DailyGoalTracker></DailyGoalTracker>
      </div>

      <ExerciseTrackerCard></ExerciseTrackerCard>

      <WeightHistoryCard></WeightHistoryCard>

      <HealthInsightsCard></HealthInsightsCard>
    </main>
  );
}
