import DailyGoalTracker from "../Tracker/DailyGoalTracker/DailyGoalTracker";
import NutrientsTracker from "../Tracker/NutrientsTracker/NutrientsTracker";
import HealthInsightsCard from "./HealthInsights.jsx/HealthInsightsCard";
import ExerciseTrackerCard from "./ExerciseTracker/ExerciseTrackerCard";
import WeightHistoryCard from "./WeightHistory/WeightHistoryCard";
import { useContext, useEffect, useState } from "react";
import WaterIntakeCard from "./WaterIntakeCard/WaterIntakeCard";
import { ClipboardPlus } from "lucide-react";
import FoodSelectionPanel from "../Tracker/FoodSelectionPanel/FoodSelectionPanel";
import StreakCard from "./ExerciseTracker/StreakCard";
import { useUserLogsStore } from "../../store/userLogsStore";
import { LoadingComponent } from "../utilities/LoadingComponent";
import toast from "react-hot-toast";
import FoodListDialog from "../Tracker/FoodListDialog";

export default function DashBoard() {
  const loadFoods = useUserLogsStore((s) => s.loadFoods);
  const logsLoading = useUserLogsStore((s) => s.logsLoading);
  const getTodayFoods = useUserLogsStore((s) => s.getTodayFoods);

  // Load user logs on mount
  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const logs = await getTodayFoods();
      } catch (error) {}
      try {
        const foods = await loadFoods();
      } catch (error) {
        toast.error("Could not fetch foods");
      }
    };

    fetchUserLogs();
  }, []);

  if (logsLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <main className="dashboard-main">
      <div className="welcome-container">
        <h2>
          Welcome back, <span>Nikos</span>
        </h2>
        <p>Here's your nutrition and activity summary for today</p>
      </div>

      <>
        <FoodListDialog></FoodListDialog>
      </>
      <div className="dashboard">
        <div className="charts-container">
          <NutrientsTracker></NutrientsTracker>

          <DailyGoalTracker></DailyGoalTracker>
        </div>
        <div className="flex-row-container">
          <WeightHistoryCard></WeightHistoryCard>

          <HealthInsightsCard></HealthInsightsCard>
        </div>
        <div
          className="flex-row-container"
          style={{ justifyContent: "start", alignItems: "center" }}
        >
          <WaterIntakeCard></WaterIntakeCard>
          <ExerciseTrackerCard></ExerciseTrackerCard>
          <StreakCard></StreakCard>
        </div>

        {/**/}
      </div>
    </main>
  );
}
