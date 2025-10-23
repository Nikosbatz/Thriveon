import {
  Dumbbell,
  ArrowDown,
  Weight,
  Mars,
  Venus,
  Ruler,
  Scale,
  Activity,
  Save,
  Hammer,
} from "lucide-react";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";

export default function OnBoarding() {
  const [formInputs, setFormInputs] = useState({
    goal: null,
    gender: "",
    height: "",
    weight: "",
    activity: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formInputs);
    navigate("./plan", replace);
  }
  //TODO: make the render of form input options throught .map() method
  //TODO: When user logs in return the User document from the DB. to check if the on-boarding is completed
  //TODO: implement function to calculate the user's goals and send the to the Back-End to store in DB
  return (
    <main className="on-boarding-container">
      <div className="welcome-container modal">
        <h2>Welcome NutriTracker!</h2>
        <h3>
          Tell us a bit more about you, so we can personalize your experience
        </h3>
        <form className="on-boarding-form">
          <div className="user-choice-list-container">
            <h3>What is your Goal?</h3>
            <ul>
              <li
                className={formInputs.goal === 1 ? "active" : null}
                onClick={() => setFormInputs((prev) => ({ ...prev, goal: 1 }))}
              >
                <ArrowDown></ArrowDown>Lose Weight
              </li>
              <li
                className={formInputs.goal === 2 ? "active" : null}
                onClick={() => setFormInputs((prev) => ({ ...prev, goal: 2 }))}
              >
                <Dumbbell></Dumbbell>Gain Mass
              </li>
              <li
                className={formInputs.goal === 3 ? "active" : null}
                onClick={() => setFormInputs((prev) => ({ ...prev, goal: 3 }))}
              >
                <Scale></Scale>Maintain Weight
              </li>
            </ul>
          </div>

          <div className="user-choice-list-container">
            <h3>Gender:</h3>
            <ul>
              <li
                className={formInputs.gender === "female" ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, gender: "female" }))
                }
              >
                <Venus></Venus>Female
              </li>
              <li
                className={formInputs.gender === "male" ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, gender: "male" }))
                }
              >
                <Mars></Mars>Male
              </li>
            </ul>
          </div>
          <div className="flex-row-container">
            <div>
              <h3>Height: (cm)</h3>
              <div className="input-container">
                <Ruler></Ruler>
                <input
                  onChange={(e) =>
                    setFormInputs((prev) => ({
                      ...prev,
                      height: e.target.value,
                    }))
                  }
                  value={formInputs.height}
                  type="number"
                  placeholder="cm"
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <h3>Weight: (kg)</h3>
              <div className="input-container">
                <Weight></Weight>
                <input
                  onChange={(e) =>
                    setFormInputs((prev) => ({
                      ...prev,
                      weight: e.target.value,
                    }))
                  }
                  value={formInputs.weight}
                  type="number"
                  placeholder="kg"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
          <div className="user-choice-list-container">
            <h3>Activity Frequency:</h3>
            <ul>
              <li
                className={formInputs.activity === 1 ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, activity: 1 }))
                }
              >
                <Activity size={12}></Activity>
                None
              </li>
              <li
                className={formInputs.activity === 2 ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, activity: 2 }))
                }
              >
                <Activity size={15}></Activity>Light
              </li>
              <li
                className={formInputs.activity === 3 ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, activity: 3 }))
                }
              >
                <Activity size={18}></Activity>moderate
              </li>
              <li
                className={formInputs.activity === 4 ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, activity: 4 }))
                }
              >
                <Activity size={25}></Activity>Active
              </li>
            </ul>
          </div>
          <button className="submit_btn" type="submit" onClick={handleSubmit}>
            <Hammer></Hammer>
            Build Plan
          </button>
        </form>
      </div>
    </main>
  );
}
