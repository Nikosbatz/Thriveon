import { useEffect, useState, useRef } from "react";
import { getUserWaterIntake, postUserWaterIntake } from "../../../api/requests";
import { useClickOutside } from "../../useClickOutside";

export default function WaterIntakeInsight() {
  const [isClicked, setIsClicked] = useState(false);
  const [waterInput, setwaterInput] = useState("");
  const [waterIntake, setWaterIntake] = useState(0);
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  /*useEffect(() => {
    async function getWater(userId) {
      try {
        const res = await getUserWaterIntake(userId);
        setWaterIntake(res);
      } catch (error) {
        alert(error);
        setWaterIntake(0);
      }
    }
    getWater("68af8401a59ee8c515ee275e");
    return () => {};
  }, []);*/

  // useEffect to fetch the user's  water intake amount from the back-end
  useEffect(() => {
    // Prevent setting state when component is not mounted
    let isMounted = true;

    const fetchWaterIntake = async () => {
      try {
        const data = await getUserWaterIntake("68af8401a59ee8c515ee275e");
        if (isMounted) {
          setWaterIntake(data);
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
  // -------- useEffect --------

  // Click Outside useEffect
  useClickOutside(cardRef, () => {
    setIsClicked(false);
  });
  //-------- Click Outside --------

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
    try {
      // returns the water amount if the response status is '200' or '201'
      const res = await postUserWaterIntake(Number(water));
      setWaterIntake(res);
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
              <img
                onClick={() => handleAddWater(waterInput)}
                src="./assets/tick_svg_blue.svg"
              ></img>
            ) : (
              <img
                className="disabled"
                src="./assets/tick_svg_disabled.svg"
              ></img>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
