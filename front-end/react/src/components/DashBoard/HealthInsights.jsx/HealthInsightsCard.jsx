import { useContext } from "react";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import HealthInsightsItem from "./HealthInsightsItem";
import WaterIntakeInsight from "../WaterIntakeCard/WaterIntakeInsight";

export default function HealthInsightsCard() {
  const { todaysMacros } = useContext(FoodsContext);
  return (
    <div className="insights-card modal">
      <div className="flex-column-container">
        <h2>Health Insights</h2>
        <span>Health insights tailor made for you</span>
      </div>
      <div className="insights-card-items-container">
        {Object.keys(todaysMacros).map((item) => (
          <HealthInsightsItem nutrient={item}></HealthInsightsItem>
        ))}
        {/*<WaterIntakeInsight></WaterIntakeInsight>*/}
      </div>
    </div>
  );
}
