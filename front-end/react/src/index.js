import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TrackerPanel from "./components/Tracker/TrackerPanel";
import MainLayout from "./components/MainLayout";
import AddFoodPanel from "./components/Add Food Panel/AddFoodPanel";
import MyProfileLayout from "./components/My Profile/MyProfileLayout";
import Personalinfo from "./components/My Profile/PersonalInfo";
import DashBoard from "./components/DashBoard/DashBoard";
import PersonalGoals from "./components/My Profile/PersonalGoals";
import Security from "./components/My Profile/Security";
import Login from "./components/Auth/Login";
import Auth from "./components/Auth/Auth";
import VerifyEmail from "./components/Auth/VerifyEmail";
import { ProtectedRoute, RedirectRoute } from "./components/RouteProtection";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import OnBoarding from "./components/OnBoarding/OnBoarding";
import Plan from "./components/OnBoarding/Plan";
import UserContextProvider from "./components/Contexts/UserContext/UserContextProvider";
import OnBoardingLayout from "./components/OnBoarding/OnBoardingLayout";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <RedirectRoute>
        <Auth />
      </RedirectRoute>
    ),
    children: [
      { index: true, element: <Navigate to="./login" replace /> },
      {
        path: "login",
        element: <Login />,
      },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:id", element: <ResetPassword /> },
    ],
  },
  {
    path: "/",
    element: (
      <UserContextProvider>
        <MainLayout />
      </UserContextProvider>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", index: true, element: <DashBoard /> },
      { path: "/calorie-tracker", element: <TrackerPanel /> },
      { path: "/add-food", element: <AddFoodPanel /> },
      {
        path: "/my-profile",
        element: <MyProfileLayout />,
        children: [
          { index: true, element: <Navigate to="./personal-info" replace /> },
          { path: "personal-info", element: <Personalinfo /> },
          { path: "personal-goals", element: <PersonalGoals /> },
          { path: "security", element: <Security /> },
        ],
      },
    ],
  },
  {
    path: "/on-boarding",
    element: (
      <UserContextProvider>
        <OnBoardingLayout></OnBoardingLayout>
      </UserContextProvider>
    ),
    children: [
      { index: true, element: <OnBoarding></OnBoarding> },
      { path: "plan", element: <Plan></Plan> },
    ],
  },
  { path: "/*", element: <Navigate to="/" replace /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
