import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function WeightBarChart({ weightLogs }) {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        data={weightLogs}
        margin={{
          top: 0,
          right: 20,
          left: 0,
          bottom: 0,
        }}
        isAnimationActive={false} // disables chart-level animation
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Bar
          dataKey="weight"
          fill="#0aa9e3ff"
          activeBar={<Rectangle fill="#032d75ff" stroke="#c9c9c9ff" />}
          isAnimationActive={false} // disables bar grow animation
          label={{ position: "insideTop", fill: "#fff" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
