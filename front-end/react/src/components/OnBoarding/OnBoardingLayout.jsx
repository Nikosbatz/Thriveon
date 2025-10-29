import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext/UserContext";
import OnBoarding from "./OnBoarding";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingComponent } from "../utilities/LoadingComponent";
import Plan from "./Plan";

export default function OnBoardingLayout() {
  const { userProfile } = useContext(UserContext);
  const [onBoardingCompleted, setOnBoardingCompleted] = useState(false);

  console.log(userProfile);

  if (userProfile !== null) {
    if (!userProfile.onBoardingCompleted) {
      return <OnBoarding></OnBoarding>;
    } else {
      return <Plan></Plan>;
    }
  } else {
    return <LoadingComponent></LoadingComponent>;
  }
}
