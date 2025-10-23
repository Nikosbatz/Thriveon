import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext/UserContext";
import PersonalGoals from "../My Profile/PersonalGoals";
import { ArrowBigRightDash } from "lucide-react";

export default function Plan() {
  const { userProfile } = useContext(UserContext);

  console.log(userProfile.nutritionGoals.calories);
  return (
    <main className="on-boarding-container">
      <div className="plan-container modal">
        <h2>Your Personal Plan</h2>
        <PersonalGoals></PersonalGoals>
        <span>
          You are all set! You can now start using <b>NutriTracker</b>.
          <br />
          Remember you can always change your personal info on <b>
            My Profile
          </b>{" "}
          tab.
        </span>
        <button className="submit_btn">
          <ArrowBigRightDash></ArrowBigRightDash> My Dashboard
        </button>
      </div>
    </main>
  );
}
