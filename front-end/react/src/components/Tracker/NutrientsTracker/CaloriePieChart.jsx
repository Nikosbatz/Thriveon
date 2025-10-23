import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import { useContext } from "react";
import { useState, useMemo } from "react";

const COLORS = ["#dcd500ff", "#07d1c7ff", "#28e806ff", "#0539e3ff"];
export default function CaloriePieChart({}) {
  const { mealCalories } = useContext(FoodsContext);

  return (
    <ResponsiveContainer className="pie-chart" height="90%" width="90%">
      <PieChart>
        <Pie
          data={
            mealCalories.every((entry) => entry.value === 0)
              ? [{ name: "Add Foods To Show Kcal", value: 1 }]
              : mealCalories
          }
          cx="40%"
          cy="50%"
          innerRadius="55%"
          outerRadius="80%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={{
            fontSize: 13, // font size
            fontWeight: "bold", // font weight
            offsetRadius: 10, // move labels slightly away from the pie
          }}
          isAnimationActive={false}
          animationBegin={0}
          animationDuration={200}
        >
          {mealCalories.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="bottom"
          align="left"
          iconType="circle"
          iconSize={5} // size of the legend icon
          wrapperStyle={{
            fontSize: "0.75rem", // size of legend text
            fontWeight: "bold", // optional styling
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
