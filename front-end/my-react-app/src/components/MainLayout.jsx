import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import UserContextProvider from "./Contexts/UserContext/UserContextProvider";
import FoodsContextProvider from "./Contexts/FoodContext/FoodsContextProvider";
import { ProtectedRoute } from "./RouteProtection";

export default function MainLayout() {
  const location = useLocation();
  return (
    <UserContextProvider>
      <div className="main-layout">
        <Header location={location} />
        <FoodsContextProvider>
          <Outlet />
        </FoodsContextProvider>
        {/*<div className="spacer"></div>*/}
        <Footer />
      </div>
    </UserContextProvider>
  );
}
