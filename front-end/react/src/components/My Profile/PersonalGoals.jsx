import { useState, useContext } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext/UserContext";

export default function PersonalGoals() {
  /*const userProfile = useOutletContext();*/
  const { userProfile } = useContext(UserContext);
  const [disabledInputs, setdisabledInputs] = useState(true);

  return (
    <div className="personal-goals">
      <button
        className={disabledInputs ? "edit-info-btn" : "edit-info-btn active"}
        onClick={() => {
          setdisabledInputs((prev) => !prev);
        }}
      >
        {disabledInputs ? "edit info" : "save changes"}
        <img src="/assets/edit.png"></img>
      </button>
      <div className="nutrition-goals-container flex-item">
        <h2>Nutrition Goals:</h2>
        <img src="/assets/broccoli.svg" alt="" />
        {/* Render Nutrition Goals with map() */}
        {nutritionFields.map(({ label, key, unit }) => (
          <div
            key={key}
            className={disabledInputs ? "info-pair" : "info-pair active"}
          >
            <span>{label}:</span>
            <input
              disabled={disabledInputs}
              value={`${userProfile.nutritionGoals[key]} ${unit}`}
            />
          </div>
        ))}
      </div>
      <div className="health-goals-container flex-item">
        <h2>Health Goals:</h2>
        <img src="/assets/heart-red.svg" alt="" />
        {/* Render Health Goals with map() */}
        {healthFields.map(({ label, value }) => (
          <div
            key={label}
            className={disabledInputs ? "info-pair" : "info-pair active"}
          >
            <span>{label}:</span>
            <input disabled={disabledInputs} value={value(userProfile)} />
          </div>
        ))}
      </div>
    </div>
  );
}

const goals = ["Lose Weight", "Gain Mass", "Maintain Weight"];

const nutritionFields = [
  { label: "Daily Calories", key: "calories", unit: "kcal" },
  { label: "Daily Protein", key: "protein", unit: "G" },
  { label: "Daily Carbs", key: "carbs", unit: "G" },
  { label: "Daily Fats", key: "fats", unit: "G" },
];

const healthFields = [
  { label: "Main Goal", value: (userProfile) => goals[userProfile.goal] },
  {
    label: "Weight Goal",
    value: (userProfile) => `${userProfile.healthGoals.weight} Kgs`,
  },
  {
    label: "Daily Water Intake",
    value: (userProfile) => `${userProfile.healthGoals.water} Liters`,
  },
];
