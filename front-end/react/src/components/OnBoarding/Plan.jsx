import PersonalGoals from "../My Profile/PersonalGoals";
import { ArrowBigRightDash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function Plan() {
  const userProfile = useUserStore((s) => s.userProfile);

  const navigate = useNavigate();

  console.log(userProfile.nutritionGoals);
  return (
    <main className="on-boarding-container">
      <div className="plan-container modal">
        <h2>Your Personal Plan</h2>
        <PersonalGoals></PersonalGoals>
        <span>
          You are all set! You can now start using <b>ThriveOn</b>.
          <br />
          Remember you can always change your personal info on <b>
            My Profile
          </b>{" "}
          tab.
        </span>
        <button onClick={() => navigate("/dashboard")} className="submit_btn">
          <ArrowBigRightDash></ArrowBigRightDash> My Dashboard
        </button>
      </div>
    </main>
  );
}
