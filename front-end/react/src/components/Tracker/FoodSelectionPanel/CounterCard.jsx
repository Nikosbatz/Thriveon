import { useContext, useState } from "react";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";

export default function CounterCard({ mealTypeSelected, setMealTypeSelected }) {
  const { todaysFoods, removeAllFoods, removeFood } = useContext(FoodsContext);

  function handleRemoveFood(e, food, mealTypeSelected) {
    e.stopPropagation();
    removeFood(food, mealTypeSelected);
  }

  return (
    <div className="counter-card modal">
      <div>
        <h2>{mealTypeSelected} Foods</h2>
        {todaysFoods !== null && (
          <ul>
            {todaysFoods.map((food) =>
              food.mealType === mealTypeSelected ? (
                <li className="food-container" key={food.key}>
                  <div className="name-macros-container">
                    <h3>
                      {food.name} ({food.grams}g)
                    </h3>
                    <div>
                      <span>
                        protein:{" "}
                        <span className="macro-value">{food.protein}g</span>
                      </span>
                      <span>
                        carbs:{" "}
                        <span className="macro-value">{food.carbs}g</span>
                      </span>
                      <span>
                        fats: <span className="macro-value">{food.fats}g</span>
                      </span>
                    </div>
                  </div>

                  <span className="calories-value">{food.calories} kcal</span>
                  <img
                    id="trash-can"
                    onClick={(e) => handleRemoveFood(e, food, mealTypeSelected)}
                    src="/assets/trashcan_red.svg"
                    alt="delete"
                  />
                </li>
              ) : null
            )}
          </ul>
        )}
      </div>
    </div>
  );
  /*<div id="counter-accept-delete">
        <img
          onClick={() => removeAllFoods(mealTypeSelected)}
          src="./assets/cross.png"
        ></img>
        <img src="./assets/tick.png"></img>
      </div>*/
}
