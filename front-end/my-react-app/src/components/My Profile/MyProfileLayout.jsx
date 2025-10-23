import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProfileNav from "./ProfileNav";

export default function MyProfileLayout() {
  const [userProfile, setUserProfile] = useState(profile);

  const location = useLocation();

  return (
    <main className="my-profile-layout">
      <ProfileNav location={location}></ProfileNav>
      <div className="profile-outlet">
        <Outlet context={userProfile}></Outlet>
      </div>
      {/*<MyProgress></MyProgress>*/}
    </main>
  );
}

const profile = {
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
};
