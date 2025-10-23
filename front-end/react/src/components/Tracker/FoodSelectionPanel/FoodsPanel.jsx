import { useState, useRef, useEffect } from "react";
import FoodInfoCard from "./FoodInfoCard";
import { useContext } from "react";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import { useClickOutside } from "../../useClickOutside";

export default function FoodsPanel({ mealTypeSelected }) {
  const { foods, handleAddFood } = useContext(FoodsContext);
  const foodCardInputRef = useRef(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [gramsQuantity, setGramsQuantity] = useState("");
  const [foodCardInput, setFoodCardInput] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState({
    food: null,
    show: false,
  });
  const [foodsLoading, setfoodsLoading] = useState(true);

  useClickOutside(foodCardInputRef, () => {
    setSelectedFood(null);
    setFoodCardInput("");
  });

  function handleFoodAddition(e, foodObj) {
    //console.log(foodObj);

    handleAddFood(foodObj, Number(foodCardInput), mealTypeSelected);
    setSelectedFood(null);
    setFoodCardInput("");

    // Show the success message
    setShowSuccessMessage((prev) => ({
      ...prev,
      food: foodObj,
      show: true,
    }));

    // Start the Fade out animation
    setTimeout(() => {
      setShowSuccessMessage((prev) => ({
        ...prev,
        show: false,
      }));
    }, 500);

    // Un-render the success message <span>
    setTimeout(() => {
      setShowSuccessMessage((prev) => ({
        ...prev,
        food: null,
        show: false,
      }));
    }, 1000);
  }

  // Open the foodCard-input div and set content to ""
  function handleAddButtonClick(foodObj) {
    setSelectedFood(foodObj);
    setFoodCardInput("");
  }

  return foods.map((foodObj) => {
    return (
      <div key={foodObj.name} className="foodCard">
        <div className="foodCard-info">
          <h2 onClick={(e) => handleAddButtonClick(foodObj, e.target)}>
            {foodObj.name}
          </h2>
          <div className="foodcard-macros">
            <span>
              protein: <b>{foodObj.protein}</b>
            </span>
            <span>
              fats: <b>{foodObj.fats}</b>
            </span>
            <span>
              carbs: <b>{foodObj.carbs}</b>
            </span>
          </div>
        </div>

        {selectedFood != null && selectedFood.name === foodObj.name ? (
          <div ref={foodCardInputRef} className="foodCard-input">
            <input
              value={foodCardInput}
              onChange={(e) => setFoodCardInput(e.target.value)}
              type="number"
              placeholder="Gs"
              className={
                selectedFood != null && selectedFood.name === foodObj.name
                  ? "active"
                  : ""
              }
            ></input>
            {foodCardInput === "" ? (
              <img
                className="disabled"
                src="./assets/tick_svg_disabled.svg"
              ></img>
            ) : (
              <img
                onClick={(e) => handleFoodAddition(e, foodObj)}
                src="./assets/tick_svg_blue.svg"
              ></img>
            )}
          </div>
        ) : (
          <>
            {showSuccessMessage.food !== null &&
              showSuccessMessage.food.name === foodObj.name && (
                <span
                  className={
                    showSuccessMessage.show
                      ? "foodCard-success-span active"
                      : "foodCard-success-span"
                  }
                >
                  Food Added!
                </span>
              )}
            <img
              onClick={(e) => handleAddButtonClick(foodObj)}
              src="./assets/plus_svg.svg"
            ></img>
          </>
        )}
      </div>
    );
  });

  /*  selectedFood != null && selectedFood.name === foodObj.name && (
      <FoodInfoCard
        mealTypeSelected={mealTypeSelected}
        foodObj={foodObj}
        setGramsQuantity={setGramsQuantity}
        handleAddFood={handleAddFood}
        gramsQuantity={gramsQuantity}
        setSelectedFood={setSelectedFood}
        handleFoodSelection={handleFoodSelection}
      ></FoodInfoCard>
    );*/
}
