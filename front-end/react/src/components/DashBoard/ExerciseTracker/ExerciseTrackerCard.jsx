import { useState, useEffect } from "react";
import AddActivityModal from "./AddActivityModal";
import { getUserActivities } from "../../../api/requests";

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

  // ===== RETURN =====

  return (
    <div className="modal exercise-tracker-container">
      <h2>Track Your Exercise</h2>
      <div className="inner-card">
        {/*<img src="./assets/gym_orange.svg" alt="" />*/}

        <div className="modal exercise-flex-item today-exercise-card">
          <h3>Exercise</h3>
          <div className="flex-item">
            <img src="./assets/fire.svg"></img>
            <span>{totalCalories} kcal</span>
          </div>
          <div className="flex-item">
            <img src="./assets/clock_blue.svg" alt="" />
            <span>{totalDuration} mins</span>
          </div>
        </div>
        <div className="modal exercise-flex-item streak-card">
          <h3>Streak</h3>
          <div className="flex-container">
            <div className="image-container">
              <img src="./assets/lightning_blue_white.svg" alt="" />
            </div>
            <div className="streak-badge">
              <span>1</span> Day Streak!
            </div>
          </div>
          <span className="streak-hint">Keep Going!</span>
        </div>
        <div
          onClick={() => {
            setAddActivityClicked(!addActivityClicked);
          }}
          className={
            addActivityClicked
              ? "modal exercise-flex-item add-activity clicked"
              : "modal exercise-flex-item add-activity"
          }
        >
          <img className="background-img" src="./assets/223.jpg" alt="" />
          <img className="add-img" src="./assets/add_test.svg" alt="" />
          <h3>Add activity</h3>
        </div>
      </div>
      <AddActivityModal
        addActivityClicked={addActivityClicked}
        setAddActivityClicked={setAddActivityClicked}
        handleSuccessMessage={handleSuccessMessage}
      ></AddActivityModal>
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
