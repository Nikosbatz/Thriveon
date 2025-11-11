import { useState, useEffect } from "react";
import AddActivityModal from "./AddActivityModal";
import { getUserActivities } from "../../../api/requests";
import { Flame, Timer } from "lucide-react";

export default function ExerciseTrackerCard() {
  const [addActivityClicked, setAddActivityClicked] = useState(false);
  const [userActivities, setUserActivities] = useState([]);
  const [showSucessMessage, setShowSucessMessage] = useState(false);
  const [fadeMessage, setFadeMessage] = useState(false);

  // Color Yellow code: #CBB001

  // ===== useEffect =====
  useEffect(() => {
    let isMounted = true;
    const fetchUserActivities = async () => {
      try {
        const data = await getUserActivities();
        if (isMounted) {
          setUserActivities(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserActivities();
    return () => {
      isMounted = false;
    };
  }, [addActivityClicked]);

  function handleSuccessMessage(show) {
    if (show) {
      setShowSucessMessage(true);
      setTimeout(() => {
        setFadeMessage(true);
      }, 1500);
      setTimeout(() => {
        setShowSucessMessage(false);
        setFadeMessage(false);
      }, 2000);
    }
  }

  const totalDuration = userActivities.reduce(
    (sum, activity) => sum + activity.duration,
    0
  );

  const totalCalories = userActivities.reduce(
    (sum, activity) => sum + activity.calories,
    0
  );

  const durationPercentage = Math.floor((totalDuration / 60) * 100);
  const caloriesPercentage = Math.floor((totalCalories / 400) * 100);

  //console.log(durationPercentage + " : " + caloriesPercentage);
  console.log(totalCalories + " : " + totalDuration);

  // ===== RETURN =====

  return (
    <div className="modal exercise-tracker-container">
      <h2>Activity stats</h2>
      <div className="item">
        <div className="flex-row-container">
          <Flame></Flame>
          <div className="progress-bar-container">
            <div className="flex-row-container">
              <h3>Calories Burned</h3>
              <span>{totalCalories}/400</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                style={{ width: `${caloriesPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="flex-row-container">
          <Timer />
          <div className="progress-bar-container">
            <div className="flex-row-container">
              <h3>Active Minutes</h3>
              <span>{totalDuration}/60</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                style={{ width: `${durationPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <img
        onClick={() => setAddActivityClicked((prev) => !prev)}
        src="../assets/add_test.svg"
        alt=""
      />
      <div
        className={
          addActivityClicked ? "dialog-overlay active" : "dialog-overlay"
        }
      >
        <AddActivityModal
          addActivityClicked={addActivityClicked}
          setAddActivityClicked={setAddActivityClicked}
          handleSuccessMessage={handleSuccessMessage}
        ></AddActivityModal>
      </div>
      {showSucessMessage ? (
        <div
          className={
            fadeMessage ? "success-message fade-out" : "success-message"
          }
        >
          Activity Added Successfully!
        </div>
      ) : null}
    </div>
  );
}
