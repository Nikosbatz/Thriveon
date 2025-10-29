import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { UserContext } from "./Contexts/UserContext/UserContext";
import FoodsContextProvider from "./Contexts/FoodContext/FoodsContextProvider";
import { ProtectedRoute } from "./RouteProtection";
import { LoadingComponent } from "./utilities/LoadingComponent";
import { useContext } from "react";
import OnBoarding from "./OnBoarding/OnBoarding";

export default function MainLayout() {
  const { userProfile } = useContext(UserContext);
  const location = useLocation();

  if (userProfile !== null) {
    if (!userProfile.onBoardingCompleted) {
      return <Navigate to={"/on-boarding"}></Navigate>;
    } else {
      return (
        <div className="main-layout">
          <Header location={location} />
          <FoodsContextProvider>
            <Outlet />
          </FoodsContextProvider>
          {/*<div className="spacer"></div>*/}
          <Footer />
        </div>
      );
    }
  } else {
    return <LoadingComponent></LoadingComponent>;
  }
}
