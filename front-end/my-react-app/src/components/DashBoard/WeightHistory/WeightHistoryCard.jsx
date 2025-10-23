import { useEffect, useState } from "react";
import LogWeightModal from "./LogWeightModal";
import WeightBarChart from "./WeightBarChart";
import { getUserWeightLogs } from "../../../api/requests";

export default function WeightHistoryCard() {
  const [logWeightClicked, setLogWeightClicked] = useState(false);
  const [weightLogs, setWeightLogs] = useState([]);
  const [showSucessMessage, setShowSucessMessage] = useState(false);
  const [fadeMessage, setFadeMessage] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchWeightLogs = async () => {
      try {
        const logs = await getUserWeightLogs();
        if (isMounted) {
          setWeightLogs(logs);
        }
      } catch (error) {
        //todo
      }
    };

    fetchWeightLogs();

    return () => {
      isMounted = false;
    };
  }, [logWeightClicked]);

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

  return (
    <div className="modal weight-history-card">
      <h2>Weight History</h2>
      <WeightBarChart weightLogs={weightLogs}></WeightBarChart>
      <LogWeightModal
        logWeightClicked={logWeightClicked}
        setLogWeightClicked={setLogWeightClicked}
        handleSuccessMessage={handleSuccessMessage}
      ></LogWeightModal>
      <img
        onClick={() => setLogWeightClicked((prev) => !prev)}
        src="./assets/add_test.svg"
        alt=""
      />
      {showSucessMessage ? (
        <div
          className={
            fadeMessage ? "success-message fade-out" : "success-message"
          }
        >
          Weight Logged Successfully!
        </div>
      ) : null}
    </div>
  );
}
