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

        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Daily Calories:</span>
          <input
            disabled={disabledInputs}
            value={userProfile.nutritionGoals.calories + " kcal"}
          ></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Daily Protein:</span>
          <input
            disabled={disabledInputs}
            value={userProfile.nutritionGoals.protein + " G"}
          ></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Daily Carbs:</span>
          <input
            disabled={disabledInputs}
            value={userProfile.nutritionGoals.carbs + " G"}
          ></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Daily Fats:</span>
          <input
            disabled={disabledInputs}
            value={userProfile.nutritionGoals.fats + " G"}
          ></input>
        </div>
      </div>
      <div className="health-goals-container flex-item">
        <h2>Health Goals:</h2>
        <img src="/assets/heart-red.svg" alt="" />
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Main Goal:</span>
          <input disabled={disabledInputs} value={userProfile.goal}></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Weight Goal:</span>
          <input
            disabled={disabledInputs}
            value={userProfile.healthGoals.weight + " Kgs"}
          ></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Daily Water Intake:</span>
          <input
            disabled={disabledInputs}
            value={userProfile.healthGoals.water + " Liters"}
          ></input>
        </div>
      </div>
    </div>
  );
}
