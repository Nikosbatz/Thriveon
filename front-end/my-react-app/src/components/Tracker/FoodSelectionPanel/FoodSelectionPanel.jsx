import { useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoodListPanel from "./FoodListPanel";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import CounterCard from "./CounterCard";

export default function FoodSelectionPanel({}) {
  const { foods, todaysFoods } = useContext(FoodsContext);
  const [mealTypeSelected, setMealTypeSelected] = useState("BreakFast");
  const [shownFoods, setShownFoods] = useState(foods);
  const [inputValue, setInputValue] = useState("");
  const tabIndicatorRef = useRef(null);
  const mealTabsNavRef = useRef(null);
  const calorieTrackerRef = useRef(null);

  // Handle Changes in the SearchBar
  function handleSearchChange(e) {
    const newInputValue = e.target.value.toLowerCase();
    if (newInputValue === "") {
      setShownFoods(foods);
    }
    setInputValue(newInputValue);
    const filteredFoods = foods.filter((food) =>
      food.name.includes(newInputValue)
    );
    setShownFoods(filteredFoods);
  }
  //-----------------------

  // Handle changes on the meals Tab
  function handleMealTypeSelection(e, mealType) {
    setMealTypeSelected(mealType);
    const { offsetLeft, offsetWidth } = e.currentTarget;

    if (tabIndicatorRef.current) {
      console.log(offsetLeft);
      tabIndicatorRef.current.style.width = `${offsetWidth + 10}px`; // add padding if you want
      tabIndicatorRef.current.style.left = `${offsetLeft - 5}px`;
    }
  }
  //-----------------------

  return (
    <div ref={calorieTrackerRef} className="food-selection-panel modal">
      <nav ref={mealTabsNavRef} className="meal-tabs-nav no-select">
        {["BreakFast", "Lunch", "Dinner", "Snacks"].map((meal) => (
          <h2
            className={
              mealTypeSelected === meal
                ? "meal-tabs-nav-item active"
                : "meal-tabs-nav-item"
            }
            onClick={(e) => handleMealTypeSelection(e, meal)}
          >
            {meal}
          </h2>
        ))}
        <div ref={tabIndicatorRef} className="tab-indicator"></div>
      </nav>
      <FoodListPanel
        mealTypeSelected={mealTypeSelected}
        shownFoods={shownFoods}
        handleSearchChange={handleSearchChange}
      ></FoodListPanel>
      <CounterCard mealTypeSelected={mealTypeSelected}></CounterCard>
    </div>
  );
}
