import React from "react";
import { useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";

export default function NutrientBar({ nutrient }) {
  const { todaysMacros, todaysFoods } = useContext(FoodsContext);

  const nutrientData = [{ name: nutrient, value: todaysMacros[nutrient] }];

  return (
    <ResponsiveContainer className="linear-bar" width="85%" height="100%">
      <BarChart data={nutrientData} layout="vertical">
        <XAxis type="number" domain={[0, 120]} hide />
        <YAxis type="category" dataKey="name" hide />
        {/* <Tooltip /> */}
        <Bar
          isAnimationActive={false}
          dataKey="value"
          fill="#82ca9d"
          background={{ fill: "#eee" }}
        >
          <LabelList
            dataKey="value"
            position={
              (nutrientData[0].value / 120) * 100 <= 85 ? "right" : "center"
            }
            style={{ fill: "#353535ff", fontWeight: "bold" }}
            formatter={(value) => `${value}${todaysFoods.unit || "g"}`} // Optional unit
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
