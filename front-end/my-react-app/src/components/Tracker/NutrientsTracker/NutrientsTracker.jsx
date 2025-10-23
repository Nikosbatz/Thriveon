import CaloriePieChart from "./CaloriePieChart";
import NutrientBar from "./NutrientBar";

export default function NutrientsTracker() {
  return (
    <div className="nutrients-tracker modal">
      <h2>Today's Calories</h2>

      <div className="calorie-plots">
        <CaloriePieChart></CaloriePieChart>
      </div>
    </div>
  );

  /*<div className="nutrient-plots">
        <div className="nutrient-bar-container">
          <span>Protein:</span>
          <NutrientBar nutrient={"protein"}></NutrientBar>
        </div>
        <div className="nutrient-bar-container">
          <span>Carbs:</span>
          <NutrientBar nutrient={"carbs"}></NutrientBar>
        </div>
        <div className="nutrient-bar-container">
          <span>Fats:</span>
          <NutrientBar nutrient={"fats"}></NutrientBar>
        </div>
      </div> */
}
