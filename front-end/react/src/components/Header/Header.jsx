import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  SquarePlus,
  CircleUserRound,
  Activity,
} from "lucide-react";

export default function Header({ location }) {
  const [searchSelected, setSearchSelected] = useState(false);
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const handleSearchChange = (searchTerm) => {};

  function handleLinkClick() {
    setTimeout(() => {
      setHamburgerMenuActive(false);
    }, 100);
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  }

  return (
    <header id="header" className={searchSelected ? "dark" : null}>
      <div className="logo-container">
        <Activity></Activity>
        <div>
          <h2>NutriTrack</h2>
          <p>Track your wellness journey</p>
        </div>
      </div>
      <div className="spacer"></div>
      {/* Hamburger Menu (Only Visible in Mobile Devices) */}
      <button
        onClick={() => setHamburgerMenuActive((prev) => !prev)}
        className="hamburger-nav-btn"
      >
        <svg
          class={
            hamburgerMenuActive
              ? "ham hamRotate ham8 active"
              : "ham hamRotate ham8"
          }
          viewBox="0 0 100 100"
          width="70"
          onclick="this.classList.toggle('active')"
        >
          <path
            class="line top"
            d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
          />
          <path class="line middle" d="m 30,50 h 40" />
          <path
            class="line bottom"
            d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
          />
        </svg>{" "}
      </button>
      {/* ======== END ========*/}

      <nav className={hamburgerMenuActive ? "header-nav active" : "header-nav"}>
        {menuOptions.map((option) => (
          <Link
            onClick={handleLinkClick}
            className={
              location.pathname.includes(option.link) ? "active" : null
            }
            to={option.link}
          >
            {option.iconElement}
            {option.name}
          </Link>
        ))}

        <div className="log-out" onClick={handleLogOut}>
          <img src="/assets/log-out-white.svg" alt="" />
          <span>Log out</span>
        </div>

        <div className="log-out-in-nav" onClick={handleLogOut}>
          <img src="/assets/log-out-white.svg" alt="" />
          <span>Log out</span>
        </div>
      </nav>

      {/*<SearchForm
        searchSelected={searchSelected}
        setSearchSelected={setSearchSelected}
        handleSearchChange={handleSearchChange}
      />*/}
    </header>
  );
}

const menuOptions = [
  {
    name: "DashBoard",
    link: "dashboard",
    iconElement: <LayoutDashboard></LayoutDashboard>,
  },
  //{ name: "Calorie History", link: "/calorie-history" },
  //{ name: "Add New Food", link: "/add-food" },
  {
    name: "Profile",
    link: "my-profile",
    iconElement: <CircleUserRound></CircleUserRound>,
  },
];
