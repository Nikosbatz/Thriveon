import { useState } from "react";
import { FoodsContext } from "./FoodsContext";
import { useEffect } from "react";
import { getFoods, postFood, deleteUserLogsFood } from "../../../api/requests";

export default function FoodsContextProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [todaysFoods, setTodayFoods] = useState([]);
  const [todaysMacros, setTodaysMacros] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [mealCalories, setMealCalories] = useState([
    { name: "BreakFast", value: 0 },
    { name: "Lunch", value: 0 },
    { name: "Dinner", value: 0 },
    { name: "Snacks", value: 0 },
  ]);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const foodsData = await getFoods("/foods");
        const todaysFoodsData = await getUserTodayFoods();
        //console.log(foodsData);
        //console.log(todaysFoodsData);
        setFoods(foodsData);
        setTodayFoods(todaysFoodsData);
      } catch (err) {
        console.log("GET /foods or GET /foods/userlogs failed...");
      }
    }
    fetchFoods();
  }, []);

  /* 
  This runs everytime todaysFoods state changes 
  Because in sequential code the updateTodayMacros()
  would execute before the state change and update the macros
  based on the old state of todaysFoods
  */
  useEffect(() => {
    updateTodayMacros();
  }, [todaysFoods]);

  // Fetch User's today foods
  async function getUserTodayFoods() {
    try {
      const res = await getFoods("/foods/userlogs", "68af8401a59ee8c515ee275e");
      return res;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  // Update todays Macros based on the macros of the foods in todaysFoods array
  function updateTodayMacros() {
    const newMacros = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    };

    const newMealCalories = [
      { name: "BreakFast", value: 0 },
      { name: "Lunch", value: 0 },
      { name: "Dinner", value: 0 },
      { name: "Snacks", value: 0 },
    ];
    for (const food of todaysFoods) {
      // todayMacros values
      newMacros.calories += food.calories;
      newMacros.carbs += food.carbs;
      newMacros.fats += food.fats;
      newMacros.protein += food.protein;

      // mealCalories values
      newMealCalories.find((obj) => obj.name === food.mealType).value +=
        food.calories;
    }
    setTodaysMacros(newMacros);
    setMealCalories(newMealCalories);
  }

  function removeAllFoods(mealType) {
    setTodayFoods(
      todaysFoods.map((meal) => {
        if (meal.mealType === mealType) {
          return { ...meal, foods: [] };
        } else {
          return meal;
        }
      })
    );
  }

  async function removeFood(foodToDelete) {
    //const oldTodaysFoods = todaysFoods.slice();

    try {
      const res = await deleteUserLogsFood(foodToDelete);
      setTodayFoods((prev) =>
        prev.filter((obj) => obj._id !== foodToDelete._id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddFood(food, gramsInput, mealType) {
    const calories = Math.round((food.calories / food.grams) * gramsInput);
    const protein = Math.round((food.protein / food.grams) * gramsInput);
    const carbs = Math.round((food.carbs / food.grams) * gramsInput);
    const fats = Math.round((food.fats / food.grams) * gramsInput);

    const foodToUpload = {
      name: food.name,
      calories: calories,
      grams: gramsInput,
      protein: protein,
      carbs: carbs,
      fats: fats,
      mealType: mealType,
    };

    // set todaysFoods state before the requests for better UX
    //setTodayFoods([...todaysFoods, foodToUpload]);

    /* 
      POST request to upload food 
      if upload fails then postFood() throws Error() and catch fetches the food logs from the DB
      To rollback to the correct state. (Correct state == state of the DB)
    */
    try {
      const res = await postFood(foodToUpload, "/foods/userlogs");
      console.log(res.message);
      setTodayFoods((prev) => [...prev, res.message]);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <FoodsContext.Provider
      value={{
        foods,
        setFoods,
        handleAddFood,
        todaysFoods,
        removeAllFoods,
        removeFood,
        todaysMacros,
        mealCalories,
      }}
    >
      {children}
    </FoodsContext.Provider>
  );
}
