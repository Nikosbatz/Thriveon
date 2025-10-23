import { useContext } from "react";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import HealthInsightsItem from "./HealthInsightsItem";
import WaterIntakeInsight from "./WaterIntakeInsight";

export default function HealthInsightsCard() {
  const { todaysMacros } = useContext(FoodsContext);
  return (
    <div className="insights-card modal">
      <h2>Health Insights</h2>
      <div className="insights-card-items-container">
        {Object.keys(todaysMacros).map((item) => (
          <HealthInsightsItem nutrient={item}></HealthInsightsItem>
        ))}
        <WaterIntakeInsight></WaterIntakeInsight>
      </div>
    </div>
  );
}
