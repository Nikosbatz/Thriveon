import {
  Dumbbell,
  ArrowDown,
  Weight,
  Mars,
  Venus,
  Ruler,
  Scale,
  Activity,
  Hammer,
  ClockPlus,
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate, replace } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext/UserContext";
import toast from "react-hot-toast";
import calculateGoals from "./calculateGoals";
import { schemaRequired } from "../utilities/formSchemaValidation";
import Plan from "./Plan";

export default function OnBoarding() {
  const [formInputs, setFormInputs] = useState({
    goal: null,
    gender: "",
    height: "",
    weight: "",
    activity: "",
    age: "",
  });
  const navigate = useNavigate();
  const { userProfile, updateInfo } = useContext(UserContext);
  const [requestPending, setRequestPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setRequestPending(true);

    // conversion to Number is optional (it is handled by the back-end also)
    const formInputsClone = {
      ...formInputs,
      weight: Number(formInputs.weight),
      height: Number(formInputs.height),
      age: Number(formInputs.age),
    };

    // Calculate Nutrition and Health Goals
    const { nutritionGoals, healthGoals } = calculateGoals(formInputsClone);
    formInputsClone.nutritionGoals = nutritionGoals;
    formInputsClone.healthGoals = healthGoals;

    try {
      // Validate Form Values
      schemaRequired.validateSync(formInputsClone, { abortEarly: false });

      // Send request to back-end VIA userContext's "updateInfo()"
      await updateInfo(formInputsClone);

      // Navigate user to his custom plan
      navigate("./plan", replace);
    } catch (error) {
      // Show multiple toasts if multiple validation errors occur
      if (error.inner && error.inner.length > 0) {
        error.inner.forEach((err) => toast.error(err.message));
      } else {
        // if only 1 error then show toast
        toast.error(error.message);
      }
    }
    setRequestPending(false);
  }

  //TODO: make the render of form input options throught .map() method
  //TODO: When user logs in return the User document from the DB. to check if the on-boarding is completed
  return (
    <main className="on-boarding-container">
      <div className="welcome-container modal">
        <h2>Welcome ThriveOn!</h2>
        <h3>
          Tell us a bit more about you, so we can personalize your experience
        </h3>
        <form className="on-boarding-form">
          <div className="user-choice-list-container">
            <h3>What is your Goal?</h3>
            <ul>
              <li
                className={formInputs.goal === 0 ? "active" : null}
                onClick={() => setFormInputs((prev) => ({ ...prev, goal: 0 }))}
              >
                <ArrowDown></ArrowDown>Lose Weight
              </li>
              <li
                className={formInputs.goal === 1 ? "active" : null}
                onClick={() => setFormInputs((prev) => ({ ...prev, goal: 1 }))}
              >
                <Dumbbell></Dumbbell>Gain Mass
              </li>
              <li
                className={formInputs.goal === 2 ? "active" : null}
                onClick={() => setFormInputs((prev) => ({ ...prev, goal: 2 }))}
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
            <div>
              <h3>Age:</h3>
              <div className="input-container">
                <ClockPlus></ClockPlus>
                <input
                  onChange={(e) =>
                    setFormInputs((prev) => ({
                      ...prev,
                      age: e.target.value,
                    }))
                  }
                  value={formInputs.age}
                  type="number"
                  placeholder="years"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
          <div className="user-choice-list-container">
            <h3>Activity Frequency:</h3>
            <ul>
              <li
                className={formInputs.activity === 0 ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, activity: 0 }))
                }
              >
                <Activity size={12}></Activity>
                None
              </li>
              <li
                className={formInputs.activity === 1 ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, activity: 1 }))
                }
              >
                <Activity size={15}></Activity>Light
              </li>
              <li
                className={formInputs.activity === 2 ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, activity: 2 }))
                }
              >
                <Activity size={18}></Activity>moderate
              </li>
              <li
                className={formInputs.activity === 3 ? "active" : null}
                onClick={() =>
                  setFormInputs((prev) => ({ ...prev, activity: 3 }))
                }
              >
                <Activity size={25}></Activity>Active
              </li>
            </ul>
          </div>
          {requestPending ? (
            <div className="loader2"></div>
          ) : (
            <button className="submit_btn" type="submit" onClick={handleSubmit}>
              <Hammer></Hammer>
              Build Plan
            </button>
          )}
        </form>
      </div>
    </main>
  );
}

const goals = ["Lose Weight", "Gain Mass", "Maintain Weight"];
