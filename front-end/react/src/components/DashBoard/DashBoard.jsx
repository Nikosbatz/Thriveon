import DailyGoalTracker from "../Tracker/DailyGoalTracker/DailyGoalTracker";
import NutrientsTracker from "../Tracker/NutrientsTracker/NutrientsTracker";
import HealthInsightsCard from "./HealthInsights.jsx/HealthInsightsCard";
import ExerciseTrackerCard from "./ExerciseTracker/ExerciseTrackerCard";
import WeightHistoryCard from "./WeightHistory/WeightHistoryCard";
import { UserContext } from "../Contexts/UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import WaterIntakeInsight from "./WaterIntakeCard/WaterIntakeInsight";
import WaterIntakeCard from "./WaterIntakeCard/WaterIntakeCard";
import { ClipboardPlus } from "lucide-react";
import FoodSelectionPanel from "../Tracker/FoodSelectionPanel/FoodSelectionPanel";
import StreakCard from "./ExerciseTracker/StreakCard";

<ClipboardPlus />;

export default function DashBoard() {
  const { userProfile } = useContext(UserContext);
  const [openAddCaloriesDialog, setOpenAddCaloriesDialog] = useState(false);
  //TODO: add a streak card to the dashboard for unimorfity (and stretch activity stats)

  //TODO: change <img> elements with Lucide icons for faster rendering
  return (
    <main className="dashboard-main">
      <div className="welcome-container">
        <h2>
          Welcome back, <span>Nikos</span>
        </h2>
        <p>Here's your nutrition and activity summary for today</p>
      </div>
      <button onClick={() => setOpenAddCaloriesDialog((prev) => !prev)}>
        <ClipboardPlus></ClipboardPlus>Today calories
      </button>
      <div
        className={
          openAddCaloriesDialog ? "dialog-overlay active" : "dialog-overlay"
        }
      >
        <FoodSelectionPanel
          setOpenAddCaloriesDialog={setOpenAddCaloriesDialog}
          openAddCaloriesDialog={openAddCaloriesDialog}
        ></FoodSelectionPanel>
      </div>
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
