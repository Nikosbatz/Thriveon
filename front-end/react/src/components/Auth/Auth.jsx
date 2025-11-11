import { Children, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  const [userEmail, setUserEmail] = useState("");

  console.log(userEmail);
  return (
    <div className="login-page-body">
      <img src="/assets/logo-apple.png" alt="" />
      <Outlet context={{ userEmail, setUserEmail }} />
    </div>
  );
}
