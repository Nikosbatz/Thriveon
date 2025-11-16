import { useEffect, useState, useRef, useContext } from "react";
import { getUserWaterIntake, postUserWaterIntake } from "../../../api/requests";
import { useClickOutside } from "../../useClickOutside";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { CircleCheckBig } from "lucide-react";

export default function WaterIntakeInsight() {
  const [isClicked, setIsClicked] = useState(false);
  const [waterInput, setwaterInput] = useState("");
  const [waterIntake, setWaterIntake] = useState(0);
  const inputRef = useRef(null);
  const cardRef = useRef(null);
  const { userProfile } = useContext(UserContext);

  // useEffect to fetch the user's  water intake amount from the back-end
  useEffect(() => {
    // Prevent setting state when component is not mounted
    let isMounted = true;

    const fetchWaterIntake = async () => {
      try {
        const data = await getUserWaterIntake();
        if (isMounted) {
          const dailyIntakePercentage = Math.floor(
            (data / userProfile.healthGoals.water) * 100
          );
          setWaterIntake(dailyIntakePercentage);
        }
      } catch (error) {
        //console.log(error);
      }
    };

    fetchWaterIntake();

    return () => {
      isMounted = false;
    };
  }, []);

  // Click Outside useEffect
  useClickOutside(cardRef, () => {
    setIsClicked(false);
  });

  function handleCardClick() {
    setIsClicked(!isClicked);
    inputRef.current?.focus();
  }

  function handleInputClick(e) {
    e.stopPropagation();
  }

  function handleInputChange(e) {
    setwaterInput(e.target.value);
  }

  async function handleAddWater(water) {
    // get waterGoal from User profile
    const waterGoal = userProfile.healthGoals.water;
    // Validation check that water is a Number
    let waterInputNum = Number.isNaN(water) ? 0 : Number(water);
    // Dont let waterInput exceed the water daily goal
    if (waterInputNum > waterGoal) {
      waterInputNum = waterGoal;
    }
    // Calculate the percentage of the daily water intake Goal
    const dailyIntakePercentage = Math.floor((waterInputNum / waterGoal) * 100);
    try {
      // returns the water amount if the response status is '200' or '201'
      const res = await postUserWaterIntake(waterInputNum);
      setWaterIntake(dailyIntakePercentage);
      setwaterInput("");
      setIsClicked(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className={
        isClicked ? "water-intake-insight turned" : "water-intake-insight"
      }
    >
      <div className="inner">
        <div className="water-intake-front">
          <div className="water-bar">
            <div className="water-info">
              <img src="../../../../assets/water_drop.svg"></img>
              {waterIntake}%
            </div>

            <div
              style={{ bottom: `${waterIntake - 95}%` }}
              className="water-intake-insight-fill"
            ></div>
          </div>
        </div>
        <div className="water-intake-back ">
          <h3>Water Intake is low! Consider adding more water:</h3>
          <div className="add-water-container">
            <input
              ref={inputRef}
              onClick={handleInputClick}
              placeholder="Liters"
              type="number"
              onChange={(e) => handleInputChange(e)}
              value={waterInput}
            ></input>
            {waterInput !== "" ? (
              <CircleCheckBig onClick={() => handleAddWater(waterInput)} />
            ) : (
              <CircleCheckBig className="disabled" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
