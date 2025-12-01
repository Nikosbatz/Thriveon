import { useEffect } from "react";
import { LoadingComponent } from "../components/utilities/LoadingComponent";
import { useUserStore } from "../store/userStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loadingUser = useUserStore((s) => s.loadingUser);
  const onBoardingCompleted = useUserStore((s) => s.onBoardingCompleted);
  const isUserNull = useUserStore((s) => s.isUserNull);
  const loadUser = useUserStore((s) => s.loadUser);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await loadUser();
    };
    fetchUser();
  }, []);

  if (loadingUser) {
    console.log(loadingUser);
    return <LoadingComponent></LoadingComponent>;
  }

  if (isUserNull) {
    return <Navigate to="/auth/login"></Navigate>;
  }

  if (!onBoardingCompleted) {
    return <Navigate to={"/on-boarding"}></Navigate>;
  }

  return children;
}
