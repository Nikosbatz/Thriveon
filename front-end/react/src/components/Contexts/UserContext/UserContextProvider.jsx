import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { postUserInfo, getUserInfo } from "../../../api/requests";

export default function UserContextProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    async function requestUserInfo() {
      try {
        const user = await getUserInfo();
        setUserProfile(user);
        console.log(user);
      } catch (error) {}
    }

    requestUserInfo();
    return () => {};
  }, []);

  async function updateInfo(info) {
    try {
      console.log(info);
      const newUser = await postUserInfo(info);
      setUserProfile(newUser);
      console.log(newUser);
      return;
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <UserContext.Provider value={{ userProfile, updateInfo }}>
      {children}
    </UserContext.Provider>
  );
}

/* {
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
  }*/
