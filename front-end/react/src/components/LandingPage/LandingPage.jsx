import {
  ArrowRight,
  Flame,
  Apple,
  Dumbbell,
  HeartPulse,
  TrendingUp,
  Award,
  Star,
  Activity,
  Smartphone,
  Component,
  MapPinCheck,
} from "lucide-react";
import AnimatedCard from "./AnimatedCard";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page-root">
      <header className="landing-page-header">
        <div className="logo-container">
          <Activity />
          <h2>NutriTracker</h2>
        </div>
        <nav>
          <a href="#preview-section">Preview</a>
          <a href="#features-section">Features</a>
          <a href="#devices-section">Devices</a>
        </nav>
        <button onClick={() => window.open("./app/login", "_self")}>
          Get Started
        </button>
      </header>
      <main className="landing-page-main">
        <section className="section-1" id="preview-section">
          <div className="hint">
            {" "}
            <Flame />
            The first<span>100% free</span>Calorie Tracker App
          </div>
          <h1>
            Your Personal <span>Nutrition Companion</span>
          </h1>
          <p>Track calories, monitor macros, and achieve your fitness goals.</p>
          <button onClick={() => window.open("./app/login", "_self")}>
            Start Here
            <ArrowRight />
          </button>
          <div className="img-container">
            <img src="./assets/dashboard.png" alt="" />
          </div>
        </section>
        <section className="section-2" id="features-section">
          <h1>
            Everything you need <span>to succeed</span>
          </h1>
          <p>
            Comprehensive tools designed to help you reach your health goals
            faster
          </p>
          <div className="cards-container">
            {features.map((feature) => (
              <AnimatedCard feature={feature}></AnimatedCard>
            ))}
          </div>
        </section>
        <section className="section-3" id="devices-section">
          <h1>
            Track <span> anywhere, anytime</span>
          </h1>
          <div className="flex-row-container">
            <div className="img-container">
              <img src="./assets/mobile_dashboard.png" alt="" />
            </div>
            <div className="features-container">
              <div className="feature">
                <Smartphone />
                <div>
                  <h3>Mobile First Design</h3>
                  <p>Intuitive touch interface designed for mobile devices</p>
                </div>
              </div>
              <div className="feature">
                <Component />
                <div>
                  <h3>Fast & Smooth</h3>
                  <p>Lightning-fast performance on all devices</p>
                </div>
              </div>
              <div className="feature">
                <MapPinCheck />
                <div>
                  <h3>Track your meals from anywhere</h3>
                  <p>Log your meals and track your macros anywhere you are</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="landing-page-footer">
        <div className="logo-container">
          <Activity />
          <h2>NutriTracker</h2>
        </div>
        <p>© 2025 NutriTrack. Track your wellness journey.</p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Apple,
    title: "Smart meal logging",
    description:
      "Quickly log meals with our intuitive interface and extensive food database",
    backgroundColor: "rgba(249, 116, 21, 0.2)",
    mainColor: "rgba(249, 116, 21, 1)",
    speed: 0.1,
    angle: 0,
  },
  {
    icon: TrendingUp,
    title: "Macro Tracking",
    description:
      "Monitor your protein, carbs, and fats with beautiful visual breakdowns",
    backgroundColor: "rgba(177, 82, 224, 0.2)",
    mainColor: "rgba(177, 82, 224, 1)",
    speed: 0.2,
    angle: 150,
  },
  {
    icon: Flame,
    title: "Daily Streaks",
    description: "Stay motivated with streak tracking and achievement badges",
    backgroundColor: "rgba(37, 228, 228, 0.2)",
    mainColor: "rgba(37, 228, 228, 1)",
    speed: 0.25,
    angle: 120,
  },
  {
    icon: Dumbbell,
    title: "Activity Tracking",
    description: "Log workouts and track calories burned throughout your day",
    backgroundColor: "rgba(33, 196, 93, 0.2)",
    mainColor: "rgba(33, 196, 93, 1)",
    speed: 0.35,
    angle: 80,
  },
  {
    icon: HeartPulse,
    title: "Health Insights",
    description:
      "Get personalized recommendations based on your nutrition data",
    backgroundColor: "rgba(245, 159, 10, 0.2)",
    mainColor: "rgba(245, 159, 10, 1)",
    speed: 0.3,
    angle: 60,
  },
  {
    icon: Award,
    title: "Achievements",
    description:
      "Earn badges and celebrate milestones on your wellness journey",
    backgroundColor: "rgba(220, 40, 40, 0.2)",
    mainColor: "rgba(220, 40, 40, 1)",
    speed: 0.4,
    angle: 30,
  },
];
