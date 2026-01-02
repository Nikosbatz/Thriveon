import { create } from "zustand";
import { deleteUserLogsFood, getFoods, postFood } from "../api/requests";

export const useUserLogsStore = create((set, get) => ({
  logsLoading: true,
  foodsLoading: true,
  foods: [],
  todaysFoods: [],
  todaysMacros: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  },
  mealCalories: [
    { name: "BreakFast", value: 0 },
    { name: "Lunch", value: 0 },
    { name: "Dinner", value: 0 },
    { name: "Snacks", value: 0 },
  ],

  // Fetch all foods
  loadFoods: async () => {
    set({ foodsLoading: true });
    try {
      const foods = await getFoods("/foods");
      set({ foods });
      set({ foodsLoading: false });
    } catch (error) {
      // console.log("error on loadFoods: ", error.message);
      set({ foodsLoading: false });
      throw new Error("Could not communicate with server...");
    }
  },

  // Fetch today's foods
  getTodayFoods: async () => {
    set({ logsLoading: true });
    try {
      const todaysFoods = await getFoods("/foods/userlogs");
      set({ todaysFoods });
      get().updateTodayMacros();
      set({ logsLoading: false });
    } catch (error) {
      set({ logsLoading: false });
      throw new Error(
        "Could not fetch user data or there are user logs for today..."
      );
    }
  },

  // Recalculate macros from todaysFoods
  updateTodayMacros: () => {
    const { todaysFoods } = get();

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
      newMacros.calories += food.calories;
      newMacros.carbs += food.carbs;
      newMacros.fats += food.fats;
      newMacros.protein += food.protein;

      const meal = newMealCalories.find((m) => m.name === food.mealType);
      if (meal) meal.value += food.calories;
    }

    set({
      todaysMacros: newMacros,
      mealCalories: newMealCalories,
    });
  },
  removeFood: async (foodToDelete) => {
    try {
      const res = await deleteUserLogsFood(foodToDelete);
      set((state) => ({
        todaysFoods: state.todaysFoods.filter(
          (food) => food._id !== foodToDelete._id
        ),
      }));
      get().updateTodayMacros();
    } catch (err) {
      throw new Error("Could not delete food...");
    }
  },
  handleAddFood: async (food, gramsInput, mealType) => {
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
      set((state) => ({
        todaysFoods: res.message,
      }));
      get().updateTodayMacros();
    } catch (err) {
      console.log(err);
    }
  },
}));
