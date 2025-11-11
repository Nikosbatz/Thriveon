import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const WeightLineChart = ({ weightLogs }) => {
  //console.log(weightLogs);
  //console.log("WeighLineChart");
  return (
    <div
      style={{
        width: "95%",
        minHeight: "10em",
        height: "20vh",
        aspectRatio: "1.8",
        margin: "auto",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={weightLogs}
          margin={{ top: 15, right: 5, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            fontSize="12px"
            stroke="rgba(168, 168, 168, 1)"
          />
          <YAxis fontSize="14px" stroke="rgba(168, 168, 168, 1)" />
          <CartesianGrid strokeDasharray="0 0" stroke="rgba(54, 54, 54, 1)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(80, 80, 80, 1)",
              border: "1px solid black",
              borderRadius: "8px",
              color: "white",
            }}
          />

          <Line
            type="monotone"
            dataKey="weight"
            strokeWidth={2}
            stroke="rgb(37, 228, 228)"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  //
};

export default React.memo(WeightLineChart);
