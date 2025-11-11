import { Target } from "lucide-react";

export default function StreakCard() {
  return (
    <div className="streak-card modal">
      <Target></Target>
      <span>
        <b>Daily Streak</b>
      </span>
      <h2>12</h2>
      <span>Days in a row</span>
      <p>Keep going! Habits are built day by day.</p>
    </div>
  );
}
