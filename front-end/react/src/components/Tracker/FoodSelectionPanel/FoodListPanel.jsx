import FoodsPanel from "./FoodsPanel";
import CounterCard from "./CounterCard";
import { FoodsContext } from "../../Contexts/FoodContext/FoodsContext";
import { useContext, useState, useMemo } from "react";

export default function FoodListPanel({
  mealTypeSelected,
  handleSearchChange,
}) {
  const { handleAddFood, foods } = useContext(FoodsContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchBarSelected, setsearchBarSelected] = useState(false);

  // useMemo to avoid un-necessary iterations in each render
  const filteredFoods = useMemo(() => {
    if (!searchInput) return foods;

    const lower = searchInput.toLowerCase();
    return foods.filter((food) => food.name.toLowerCase().includes(lower));
  }, [foods, searchInput]);

  return (
    <div className="food-list-panel">
      <div className="FoodsPanel">
        <FoodsPanel
          filteredFoods={filteredFoods}
          mealTypeSelected={mealTypeSelected}
        ></FoodsPanel>
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
      </div>
    </div>
  );
}
