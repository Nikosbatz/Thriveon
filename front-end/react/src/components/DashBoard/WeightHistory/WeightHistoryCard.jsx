import { useEffect, useState } from "react";
import LogWeightModal from "./LogWeightModal";
import WeightBarChart from "./WeightBarChart";
import { getUserWeightLogs } from "../../../api/requests";
import WeightLineChart from "./WeightLineChart";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function WeightHistoryCard() {
  const [logWeightClicked, setLogWeightClicked] = useState(false);
  const [weightLogs, setWeightLogs] = useState([]);
  const [showSucessMessage, setShowSucessMessage] = useState(false);
  const [fadeMessage, setFadeMessage] = useState(false);
  const [weightTrend, setWeightTrend] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchWeightLogs = async () => {
      // if component is already mounted just update trend
      if (weightLogs.length > 0) {
        return setWeightTrend(
          weightLogs.at(-1).weight - weightLogs.at(0).weight
        );
      }
      try {
        // if component just mounted then make request to GET user weight logs
        const logs = await getUserWeightLogs();
        if (isMounted) {
          setWeightLogs(logs);
          setWeightTrend(logs.at(-1).weight - logs.at(0).weight);
        }
      } catch (error) {
        //todo
      }
    };

    fetchWeightLogs();

    return () => {
      isMounted = false;
    };
  }, [weightLogs]);

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
    <div className=" weight-history-card modal ">
      <div className="weight-info-container">
        <h2>
          Weight History <br />
          <span>Last 7 days</span>
        </h2>
        <div className="weight-trend">
          <h2>{weightLogs.length > 0 ? weightLogs.at(-1).weight : null} Kg</h2>
          {weightTrend > 0 ? (
            <span style={{ color: "rgba(255, 37, 37, 1)" }}>
              <ArrowUp></ArrowUp> {weightTrend} Kg this week
            </span>
          ) : (
            <span style={{ color: "rgba(42, 213, 19, 1)" }}>
              <ArrowDown></ArrowDown>
              {weightTrend} Kg this week
            </span>
          )}
        </div>
      </div>
      {/*<WeightBarChart weightLogs={weightLogs}></WeightBarChart>*/}
      <WeightLineChart weightLogs={weightLogs}></WeightLineChart>
      <LogWeightModal
        logWeightClicked={logWeightClicked}
        setLogWeightClicked={setLogWeightClicked}
        handleSuccessMessage={handleSuccessMessage}
        setWeightLogs={setWeightLogs}
      ></LogWeightModal>

      <img
        onClick={() => setLogWeightClicked((prev) => !prev)}
        src="../assets/add_test.svg"
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
