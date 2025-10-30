import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProfileNav from "./ProfileNav";

export default function MyProfileLayout() {
  const location = useLocation();

  return (
    <main className="my-profile-layout">
      <ProfileNav location={location}></ProfileNav>
      <div className="profile-outlet">
        <Outlet></Outlet>
      </div>
      {/*<MyProgress></MyProgress>*/}
    </main>
  );
}
