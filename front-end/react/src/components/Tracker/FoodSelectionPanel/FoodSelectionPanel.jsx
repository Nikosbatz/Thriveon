import { useState, useRef, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoodListPanel from "./FoodListPanel";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import CounterCard from "./CounterCard";
import { X } from "lucide-react";
import { RemoveScroll } from "react-remove-scroll";

export default function FoodSelectionPanel({
  openAddCaloriesDialog,
  setOpenAddCaloriesDialog,
}) {
  const { foods, todaysFoods } = useContext(FoodsContext);
  const [mealTypeSelected, setMealTypeSelected] = useState("BreakFast");
  const [inputValue, setInputValue] = useState("");
  const mealtabsRefs = useRef([]);
  const tabIndicatorRef = useRef(null);
  const mealTabsNavRef = useRef(null);
  const calorieTrackerRef = useRef(null);

  // useEffect to calculate the size of the first tab option on mount
  useEffect(() => {
    const firstTab = mealtabsRefs.current[0];
    if (firstTab && tabIndicatorRef.current) {
      const initialWidth = firstTab.offsetWidth;
      tabIndicatorRef.current.style.width = `${initialWidth + 10}px`;
    }
  }, [openAddCaloriesDialog]);

  // Handle changes on the meals Tab
  function handleMealTypeSelection(e, mealType) {
    setMealTypeSelected(mealType);
    const { offsetLeft, offsetWidth } = e.currentTarget;

    if (tabIndicatorRef.current) {
      tabIndicatorRef.current.style.width = `${offsetWidth + 10}px`;
      tabIndicatorRef.current.style.left = `${offsetLeft - 5}px`;
    }
  }
  //-----------------------

  if (!openAddCaloriesDialog) {
    console.log(openAddCaloriesDialog);
    return null;
  } else
    return (
      <RemoveScroll forwardProps removeScrollBar={false}>
        <div ref={calorieTrackerRef} className="food-selection-panel modal">
          <button
            className="cross-button"
            onClick={() => setOpenAddCaloriesDialog(false)}
          >
            <X></X>
          </button>
          <nav ref={mealTabsNavRef} className="meal-tabs-nav no-select">
            {["BreakFast", "Lunch", "Dinner", "Snacks"].map((meal, index) => (
              <h2
                className={
                  mealTypeSelected === meal
                    ? "meal-tabs-nav-item active"
                    : "meal-tabs-nav-item"
                }
                onClick={(e) => handleMealTypeSelection(e, meal)}
                ref={(el) => (mealtabsRefs.current[index] = el)}
              >
                {meal}
              </h2>
            ))}
            <div ref={tabIndicatorRef} className="tab-indicator"></div>
          </nav>
          <FoodListPanel mealTypeSelected={mealTypeSelected}></FoodListPanel>
          <CounterCard mealTypeSelected={mealTypeSelected}></CounterCard>
        </div>
      </RemoveScroll>
    );
}
