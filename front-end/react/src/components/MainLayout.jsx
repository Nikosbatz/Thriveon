import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="main-layout">
      <Header location={location} />
      <Outlet />
      {/*<div className="spacer"></div>*/}
      <Footer />
    </div>
  );
}
