import { useState } from "react";
import { postUserWeightLogs } from "../../../api/requests";

export default function LogWeightModal({
  logWeightClicked,
  setLogWeightClicked,
  handleSuccessMessage,
}) {
  const [fetchingData, setFetchingData] = useState(false);
  const [weightInput, setWeightInput] = useState("");
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  async function handleLogWeight() {
    setFetchingData(true);
    if (weightInput === "") {
      alert("Weight Input field cannot be empty!");
      return;
    }

    try {
      const res = await postUserWeightLogs(Number(weightInput));
      setLogWeightClicked(false);
      handleSuccessMessage(true);
    } catch (error) {
      alert("Could not log user's weight");
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
