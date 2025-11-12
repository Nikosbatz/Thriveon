import { useState, useRef } from "react";
import { useClickOutside } from "../../useClickOutside";
import { postUserActivity } from "../../../api/requests";
import { RemoveScroll } from "react-remove-scroll";
import { X, ArrowDown } from "lucide-react";

export default function AddActivityModal({
  addActivityClicked,
  setAddActivityClicked,
  handleSuccessMessage,
}) {
  const [activitySelected, setActivitySelected] = useState(false);
  const [activityValues, setActivityValues] = useState({
    activityType: "Select an activity",
    duration: "",
    calories: "",
  });
  const [fetchingData, setFetchingData] = useState(false);
  const dropdownRef = useRef(null);

  // Click Outside useEffect
  useClickOutside(dropdownRef, () => {
    setActivitySelected(false);
  });

  const activityTypes = [
    "Cardiovascular",
    "Strength",
    "Flexibility",
    "Balance",
  ];

  async function handleAddActivity() {
    // Validate that user has filled all the fields to submit the acitivity form
    if (
      !(
        activityTypes.includes(activityValues.activityType) &&
        activityValues.duration != "" &&
        activityValues.calories != ""
      )
    ) {
      alert("You must fill all the fields");
      return;
    }
    // Convert "exercise" and "calories" fields to Number type
    const activityValuesConverted = {
      calories: Number(activityValues.calories),
      duration: Number(activityValues.duration),
    };

    setFetchingData(true);
    // Try to POST the activity
    try {
      await postUserActivity(activityValuesConverted);
      // show success message at "ExerciseTrackerCard"
      handleSuccessMessage(true);
    } catch (error) {
      alert("couldnt post user activity");
    } finally {
      // Close the "addActivityModal", Clear input values,  Un-render the spinner
      setActivityValues({
        activityType: "Select an activity",
        duration: "",
        calories: "",
      });
      setFetchingData(false);
      setAddActivityClicked(false);
    }
  }

  if (!addActivityClicked) {
    return null;
  } else
    return (
      <RemoveScroll forwardProps removeScrollBar={false}>
        <div className="add-activity-dialog modal">
          <button
            className="cross-button"
            onClick={() => setAddActivityClicked((prev) => !prev)}
          >
            <X></X>
          </button>
          <form className="add-activity-form">
            <h2>Log Activity</h2>
            <span>Record your exercise and activity for today</span>
            {/* Activity Input + DropDown */}
            <div ref={dropdownRef} className="activity-input-container">
              <h4>Activity:</h4>
              <span
                onClick={() => setActivitySelected(!activitySelected)}
                className={activitySelected ? "selection active" : "selection"}
              >
                {activityValues.activityType}

                <ArrowDown />
              </span>
              <div className="dropdown-container">
                <ul
                  onClick={() => setActivitySelected(!activitySelected)}
                  className={activitySelected ? "dropdown active" : "dropdown"}
                >
                  {activityTypes.map((activity) => (
                    <li
                      onClick={() =>
                        setActivityValues((prev) => ({
                          ...prev,
                          activityType: activity,
                        }))
                      }
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Exercise Time */}
            <div className="activity-time-container">
              <h4>Exercise Time:</h4>
              <div className="activity-time-input-container">
                <input
                  type="number"
                  placeholder="mins"
                  value={activityValues.duration}
                  onChange={(e) =>
                    setActivityValues((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            {/* Calories Input */}
            <div className="activity-calories-container">
              <h4>Calories Burned:</h4>
              <div className="activity-calories-input-container">
                <input
                  type="number"
                  placeholder="kcal"
                  value={activityValues.calories}
                  onChange={(e) =>
                    setActivityValues((prev) => ({
                      ...prev,
                      calories: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            {/* Submit Button */}
            {fetchingData ? (
              <div className="loader"></div>
            ) : (
              <button
                type="button"
                className="submit_btn"
                onClick={() => handleAddActivity()}
              >
                Save
              </button>
            )}
          </form>
        </div>
      </RemoveScroll>
    );
}
