import FoodsPanel from "./FoodsPanel";
import CounterCard from "./CounterCard";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import { useContext, useState } from "react";

export default function FoodListPanel({
  mealTypeSelected,
  shownFoods,
  handleSearchChange,
}) {
  const { handleAddFood } = useContext(FoodsContext);
  const [searchBarSelected, setsearchBarSelected] = useState(false);

  return (
    <div className="food-list-panel">
      <div className="FoodsPanel">
        <FoodsPanel mealTypeSelected={mealTypeSelected}></FoodsPanel>
      </div>
      <div
        onClick={() => setsearchBarSelected(!searchBarSelected)}
        className="tracker-search"
      >
        <img src="/assets/search.png"></img>
        <input
          type="text"
          name="search-food"
          placeholder="Search Foods"
          onChange={handleSearchChange}
        ></input>
      </div>
    </div>
  );
}
