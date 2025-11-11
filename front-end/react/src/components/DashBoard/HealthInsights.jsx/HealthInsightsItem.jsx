import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import InsightHintModal from "./InsightHintModal";

export default function HealthInsightsItem({ nutrient }) {
  const { userProfile } = useContext(UserContext);
  const { todaysMacros } = useContext(FoodsContext);
  const [hintHover, setHintHover] = useState(false);

  const nutrientDailyGoal = userProfile.nutritionGoals[nutrient];
  const nutrientTodayValue = todaysMacros[nutrient];

  const dailyGoalPercentage = (
    (nutrientTodayValue / nutrientDailyGoal) *
    100
  ).toFixed(0);

  const suggestion = {
    currentIntake: null,
    message: "",
    color: "",
    imagePath: "",
  };
  if (dailyGoalPercentage <= 30) {
    suggestion.currentIntake = 1;
    suggestion.color = "rgba(253, 0, 0, 0.67)";
    suggestion.message = `Current ${nutrient} Intake Low`;
    suggestion.imagePath = "../../../assets/suggestion_red.svg";
  } else if (dailyGoalPercentage <= 60) {
    suggestion.currentIntake = 2;
    suggestion.color = "rgba(238, 200, 12, 0.67)";
    suggestion.message = `You’re getting some ${nutrient}, but you could use a little more`;
    suggestion.imagePath = "../../../../assets/suggestion_orange.svg";
  } else if (dailyGoalPercentage <= 99) {
    suggestion.currentIntake = 3;
    suggestion.color = "rgba(225, 255, 0, 0.53)";
    suggestion.message = `You are close to hitting your ${nutrient} Goal!`;
    suggestion.imagePath = "../../../../assets/suggestion_yellow.svg";
  } else {
    suggestion.currentIntake = 4;
    suggestion.color = "rgba(0, 255, 68, 0.4)";
    suggestion.message = `Great job hitting your ${nutrient} goal!`;
    suggestion.imagePath = "../../../../assets/tick.png";
  }
  return (
    <div
      style={{
        background: `linear-gradient(270deg, ${suggestion.color} 6%, rgba(25, 25, 25, 0.6) 0.05%)`,
      }}
      onMouseEnter={() => setHintHover(true)}
      onMouseLeave={() => setHintHover(false)}
      className="insights-card-item"
    >
      <img src={suggestion.imagePath}></img>

      <div className="flex-row-container">
        <h2>{nutrient}</h2>
        <InsightHintModal suggestion={suggestion}></InsightHintModal>
      </div>
    </div>
  );
}

const suggestions = {
  protein: [
    {
      msg: "Your protein intake is very low — add eggs, chicken, or beans.",
      color: "#ef4444",
    }, // Very Low
    {
      msg: "A little more protein would help — maybe a yogurt or shake.",
      color: "#f97316",
    }, // Slightly Low
    { msg: "Perfect! You’re right on track with protein.", color: "#22c55e" }, // On Track
    {
      msg: "You’ve gone above your protein goal — balance it with carbs or fats.",
      color: "#3b82f6",
    }, // Over
  ],
  carbs: [
    {
      msg: "Carbs are very low — try fruit or whole grains for energy.",
      color: "#ef4444",
    },
    {
      msg: "A few more carbs could boost your energy — oatmeal or rice would help.",
      color: "#f97316",
    },
    { msg: "Great! Your carb intake is balanced.", color: "#22c55e" },
    {
      msg: "Carbs are a bit high — balance with protein and veggies tomorrow.",
      color: "#3b82f6",
    },
  ],
  fats: [
    {
      msg: "Your fat intake is too low — add nuts, avocado, or olive oil.",
      color: "#ef4444",
    },
    {
      msg: "You could use a touch more healthy fats — maybe seeds or salmon.",
      color: "#f97316",
    },
    {
      msg: "Excellent balance — your fat intake supports energy and hormones.",
      color: "#22c55e",
    },
    {
      msg: "You’ve had more fats than needed — aim for lighter meals next.",
      color: "#3b82f6",
    },
  ],
};
