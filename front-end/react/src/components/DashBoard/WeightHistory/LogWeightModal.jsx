import { useState } from "react";
import { postUserWeightLogs } from "../../../api/requests";
import { schema } from "../../utilities/formSchemaValidation";
import toast from "react-hot-toast";
import { useUserStore } from "../../../store/userStore";

export default function LogWeightModal({
  logWeightClicked,
  setLogWeightClicked,
  handleSuccessMessage,
  setWeightLogs,
}) {
  const [fetchingData, setFetchingData] = useState(false);
  const [weightInput, setWeightInput] = useState("");
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const updateInfo = useUserStore((s) => s.updateInfo);

  async function handleLogWeight() {
    setFetchingData(true);
    if (weightInput === "") {
      toast.error("Weight input cannot be empty!");
      setFetchingData(false);
      return;
    }

    try {
      // validate inputs
      schema.validateSync({ weight: weightInput }, { abortEarly: false });

      // update user logs (FoodLog)
      const resLogs = await postUserWeightLogs(weightInput);
      console.log(resLogs);
      setWeightLogs(resLogs);

      // update user profile (User)
      await updateInfo({ weight: weightInput });
      setLogWeightClicked(false);
      handleSuccessMessage(true);
    } catch (error) {
      toast.error(error.message);
    }
    setFetchingData(false);
  }

  return (
    <div
      className={
        logWeightClicked ? "log-weight-modal active" : "log-weight-modal"
      }
    >
      <form className="weight-modal-form">
        <div className="weight-input-container">
          <span>Weight:</span>
          <input
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            type="number"
            placeholder="Kg"
          />
        </div>
        <div className="date-input-container">
          <span>Date:</span>
          <input type="date" value={formattedDate} disabled></input>
        </div>
        {/* Submit Button */}
        {fetchingData ? (
          <div className="loader"></div>
        ) : (
          <button
            type="button"
            className="submit_btn"
            onClick={() => handleLogWeight()}
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
}
