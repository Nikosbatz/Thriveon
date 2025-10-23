import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  PolarAngleAxis,
} from "recharts";

export default function DailyGoalTracker() {
  const { userProfile } = useContext(UserContext);
  const { todaysMacros } = useContext(FoodsContext);
  const { nutritionGoals } = userProfile;

  const data = [
    {
      name: "Protein",
      value: todaysMacros.protein,
      fill: "#01a8b7ff",
      goal: nutritionGoals.protein,
    },
    {
      name: "Carbs",
      value: todaysMacros.carbs,
      fill: "#0553b1ff",
      goal: nutritionGoals.carbs,
    },
    {
      name: "Fats",
      value: todaysMacros.fats,
      fill: "#06af96ff",
      goal: nutritionGoals.fats,
    },
  ];

  // Normalize values to percentage for the chart
  const percentData = data.map((d) => ({
    ...d,
    percentage: (d.value / d.max) * 100,
  }));

  return (
    <div className="daily-goal-tracker modal">
      <h2>Daily goal percentages</h2>

      <div className="daily-goal-tracker-charts">
        <RadialBarChart
          width={100}
          height={100}
          cx={47}
          cy={50}
          innerRadius="60%"
          outerRadius="110%"
          startAngle={70}
          endAngle={-270}
          data={[data[0]]}
        >
          <PolarAngleAxis
            type="number"
            tick={false}
            domain={[0, data[0].goal]}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={5}
            minAngle={15}
            clockWise
            label={{ fill: "	#f7f7f7ff", fontSize: 16 }}
            background={{ fill: "#323d4cff" }}
            isAnimationActive={false}
          />
          <Legend
            iconSize={0}
            layout="horizontal"
            verticalAlign="middle"
            align="center"
          />
        </RadialBarChart>
        <RadialBarChart
          width={100}
          height={100}
          cx={47}
          cy={50}
          innerRadius="50%"
          outerRadius="100%"
          startAngle={40}
          endAngle={-290}
          data={[data[1]]}
          background
        >
          <PolarAngleAxis
            type="number"
            tick={false}
            domain={[0, data[1].goal]}
          />
          <RadialBar
            dataKey="value"
            background={{ fill: "#323d4cff" }}
            cornerRadius={5}
            minAngle={15}
            clockWise
            label={{ fill: "	#f7f7f7ff", fontSize: 16 }}
            isAnimationActive={false}
          />
          <Legend
            iconSize={0}
            layout="horizontal"
            verticalAlign="middle"
            align="center"
          />
        </RadialBarChart>
        <RadialBarChart
          width={100}
          height={100}
          cx={47}
          cy={50}
          innerRadius="40%"
          outerRadius="100%"
          startAngle={20}
          endAngle={-310}
          data={[data[2]]}
          background
        >
          <PolarAngleAxis
            type="number"
            tick={false}
            domain={[0, data[2].goal]}
          />
          <RadialBar
            dataKey="value"
            background={{ fill: "#323d4cff" }}
            cornerRadius={5}
            minAngle={15}
            clockWise
            label={{ fill: "	#f7f7f7ff", fontSize: 16 }}
            isAnimationActive={false}
          />
          <Legend
            iconSize={0}
            layout="horizontal"
            verticalAlign="middle"
            align="center"
          />
        </RadialBarChart>
      </div>
    </div>
  );
}
