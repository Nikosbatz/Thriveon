import CaloriePieChart from "./CaloriePieChart";
import NutrientBar from "./NutrientBar";

export default function NutrientsTracker() {
  //TODO: Calculate and show calories sum, how many burnt and calculate the total

  return (
    <div className="nutrients-tracker modal">
      <h2>Today's Calories</h2>

      <div className="calorie-plots">
        <CaloriePieChart></CaloriePieChart>
      </div>
    </div>
  );
}
