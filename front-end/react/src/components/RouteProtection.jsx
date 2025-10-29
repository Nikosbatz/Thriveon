// src/components/ProtectedRoute.js
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { fetchWrapper } from "../api/fetchWrapper";
import { LoadingComponent } from "./utilities/LoadingComponent";

const BASE_URI = "/api";

export function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    async function authToken() {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
        const res = await fetchWrapper(`${BASE_URI}/user/auth`, options);
        if (res.status === 200) {
          setAuthenticated(true);
        }
      } catch (error) {}
    }

    authToken();
  }, []);

  return (
    <>
      {authenticated === null ? (
        <LoadingComponent></LoadingComponent>
      ) : authenticated === false ? (
        <Navigate to={"/auth/login"}></Navigate>
      ) : (
        children
      )}
    </>
  );
}

export function RedirectRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return children;
  }
}
