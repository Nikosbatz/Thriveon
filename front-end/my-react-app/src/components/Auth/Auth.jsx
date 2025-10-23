import { Children } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  return (
    <div className="login-page-body">
      <img src="/assets/logo-apple.png" alt="" />
      <Outlet />
    </div>
  );
}
