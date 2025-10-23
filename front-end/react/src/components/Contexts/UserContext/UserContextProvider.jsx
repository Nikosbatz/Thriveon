import { useState } from "react";
import { UserContext } from "./UserContext";

export default function UserContextProvider({ children }) {
  //TODO: After Login fetch User data with useEffect()

  const [userProfile, setUserProfile] = useState({
    firstName: "nikos",
    lastName: "batz",
    email: "nikos.mpatz@outlook.com",
    age: "27",
    avatar: null,
    weight: "77",
    height: "179",
    country: "Greece",
    goal: "Gain Mass",
    nutritionGoals: {
      calories: 3000,
      protein: 150,
      carbs: 400,
      fats: 70,
    },
    healthGoals: {
      weight: "80",
      water: "5",
      activity: "45",
    },
  });

  return (
    <UserContext.Provider value={{ userProfile }}>
      {children}
    </UserContext.Provider>
  );
}
