import { useEffect } from "react";
import OnBoarding from "./OnBoarding";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingComponent } from "../utilities/LoadingComponent";
import Plan from "./Plan";
import { useUserStore } from "../../store/userStore";

export default function OnBoardingLayout() {
  const loadingUser = useUserStore((s) => s.loadingUser);
  const isUserNull = useUserStore((s) => s.isUserNull);
  const loadUser = useUserStore((s) => s.loadUser);
  const userProfile = useUserStore((s) => s.userProfile);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await loadUser();
    };
    if (isUserNull) {
      fetchUser();
    }
  }, []);

  if (loadingUser) {
    return <LoadingComponent></LoadingComponent>;
  }

  if (isUserNull) {
    return <Navigate to="/auth/login"></Navigate>;
  }

  if (userProfile.onBoardingCompleted) {
    return <Plan></Plan>;
  }

  return <OnBoarding></OnBoarding>;
}
