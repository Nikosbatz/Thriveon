import { Navigate } from "react-router-dom";

export function RedirectRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/app/dashboard" replace />;
  } else {
    return children;
  }
}
