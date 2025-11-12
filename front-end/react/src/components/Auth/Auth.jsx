import { Children, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  const [userEmail, setUserEmail] = useState("");

  console.log(userEmail);
  return (
    <div className="login-page-body">
      <Outlet context={{ userEmail, setUserEmail }} />
    </div>
  );
}
