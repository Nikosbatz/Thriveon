import { useEffect, useRef, useState } from "react";

export default function FoodInfoCard({
  foodObj,
  setGramsQuantity,
  handleAddFood,
  gramsQuantity,
  setSelectedFood,
  handleFoodSelection,
  mealTypeSelected,
}) {
  const [show, setShow] = useState(false);
  const foodCardRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      event.stopPropagation();
      //console.log(foodCardRef.current);
      if (foodCardRef.current && !foodCardRef.current.contains(event.target)) {
        setSelectedFood(null);
        setGramsQuantity("");
      }
    };

    setTimeout(() => setShow(true), 50);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={foodCardRef}
      className={show ? "food-info-card show" : "food-info-card"}
      onClick={(e) => handleFoodSelection(foodObj, e.target)}
    >
      <h3>
        {foodObj.name}
        <br></br>
        <span>{"(/" + foodObj.grams + "g)"}</span>
      </h3>

      <span>Calories: {foodObj.calories} kcal</span>
      <span>protein: {foodObj.protein} Gs</span>
      <span>carbs: {foodObj.carbs} Gs</span>
      <span>fats: {foodObj.fats} Gs</span>
      <input
        placeholder="Grams"
        value={gramsQuantity}
        onChange={(e) => setGramsQuantity(e.target.value)}
        type="number"
      ></input>
      <button
        disabled={gramsQuantity === ""}
        onClick={() => handleAddFood(foodObj, gramsQuantity, mealTypeSelected)}
      >
        add
      </button>
    </div>
  );
}
