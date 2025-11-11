import { useState, useContext, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext/UserContext";
import { nestedSchema } from "../utilities/formSchemaValidation";
import toast from "react-hot-toast";

export default function PersonalGoals() {
  /*const userProfile = useOutletContext();*/
  const { userProfile, updateInfo } = useContext(UserContext);
  const [infoInputs, setInfoInputs] = useState(userProfile);
  const [disabledInputs, setdisabledInputs] = useState(true);
  const [loading, setLoading] = useState(false);

  console.log(infoInputs);

  useEffect(() => {
    if (userProfile) {
      setInfoInputs(userProfile);
    }
  }, [userProfile]);

  async function handleSaveChanges() {
    setLoading(true);

    console.log(infoInputs.nutritionGoals.calories);
    try {
      // validate inputs
      nestedSchema.validateSync(infoInputs, { abortEarly: false });

      // Send request to back-end VIA userContext's "updateInfo()"
      await updateInfo(infoInputs);
      setdisabledInputs(true);
    } catch (error) {
      // Show multiple toasts if multiple validation errors occur
      if (error.inner && error.inner.length > 0) {
        error.inner.forEach((err) => toast.error(err.message));
      } else {
        // if only 1 error then show toast
        toast.error(error.message);
        return;
      }
    }
    setLoading(false);
  }

  // Trim units of the real value before changing state
  function handleInputChanges(e, goalType, key, unit) {
    const value = e.target.value;

    setInfoInputs((prev) => ({
      ...prev,
      [goalType]: { ...prev[goalType], [key]: value },
    }));
  }

  console.log(infoInputs.nutritionGoals.calories);

  return (
    <div className="personal-goals">
      <button
        className={disabledInputs ? "edit-info-btn" : "edit-info-btn active"}
        onClick={
          disabledInputs
            ? () => {
                setdisabledInputs((prev) => !prev);
              }
            : handleSaveChanges
        }
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
            <div className="input-container">
              <input
                type="number"
                disabled={disabledInputs}
                value={`${infoInputs.nutritionGoals[key]}`}
                onChange={(e) =>
                  handleInputChanges(e, "nutritionGoals", key, unit)
                }
              />
              <span>{unit}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="health-goals-container flex-item">
        <h2>Health Goals:</h2>
        <img src="/assets/heart-red.svg" alt="" />
        {/* Render Health Goals with map() */}
        {healthFields.map(({ label, key, value, unit }) => (
          <div
            key={label}
            className={disabledInputs ? "info-pair" : "info-pair active"}
          >
            <span>{label}:</span>
            <div className="input-container">
              <input
                disabled={disabledInputs}
                value={value(infoInputs, unit)}
                onChange={(e) => {
                  label === "Main Goal"
                    ? setInfoInputs((prev) => ({
                        ...prev,
                        goal: e.target.value,
                      }))
                    : handleInputChanges(e, "healthGoals", key, unit);
                }}
              />
              <span>{unit}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={loading ? "loading-overlay active" : "loading-overlay"}>
        <div className="loader2"></div>
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
  {
    label: "Main Goal",
    key: "goal",
    value: (userProfile) => goals[userProfile.goal],
  },
  {
    label: "Weight Goal",
    key: "weight",
    unit: "Kg",
    value: (userProfile, unit) => `${userProfile.healthGoals.weight}`,
  },
  {
    label: "Daily Water Intake",
    key: "water",
    unit: "L",
    value: (userProfile, unit) => `${userProfile.healthGoals.water}`,
  },
];
