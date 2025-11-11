import { useState, useRef, useEffect, useContext } from "react";
import FoodInfoCard from "./FoodInfoCard";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import { useClickOutside } from "../../useClickOutside";
import { CirclePlus, CircleCheckBig } from "lucide-react";

export default function FoodsPanel({ mealTypeSelected, filteredFoods }) {
  const { handleAddFood } = useContext(FoodsContext);

  const foodCardInputRef = useRef(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [gramsQuantity, setGramsQuantity] = useState("");
  const [foodCardInput, setFoodCardInput] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState({
    food: null,
    show: false,
  });
  const [foodsLoading, setfoodsLoading] = useState(true);

  // useEffect to auto-focus clicked element input
  useEffect(() => {
    if (selectedFood && foodCardInputRef.current) {
      console.log(foodCardInputRef.current.querySelector("input").focus());
      foodCardInputRef.current.focus();
    }
  }, [selectedFood]);

  useClickOutside(foodCardInputRef, () => {
    setSelectedFood(null);
    setFoodCardInput("");
  });

  function handleFoodAddition(e, foodObj) {
    //console.log(foodObj);
    e.stopPropagation();

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
  function handleAddButtonClick(e, foodObj) {
    console.log("handleAddButtonClick");
    setSelectedFood(foodObj);
    setFoodCardInput("");
  }

  return filteredFoods.map((foodObj) => {
    return (
      <div
        key={foodObj.name}
        className="foodCard"
        onClick={(e) => handleAddButtonClick(e, foodObj)}
      >
        <div className="foodCard-info">
          <div className="name-macros-container">
            <h3 onClick={(e) => handleAddButtonClick(foodObj, e.target)}>
              {foodObj.name}
            </h3>
            <div>
              <span>
                protein: <span className="macro-value">{foodObj.protein}g</span>
              </span>
              <span>
                carbs: <span className="macro-value">{foodObj.carbs}g</span>
              </span>
              <span>
                fats: <span className="macro-value">{foodObj.fats}g</span>
              </span>
            </div>
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
              <CircleCheckBig className="disabled" />
            ) : (
              <CircleCheckBig
                className="enabled"
                onClick={(e) => handleFoodAddition(e, foodObj)}
              />
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
