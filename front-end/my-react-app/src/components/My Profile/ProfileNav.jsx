import { act, useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileNav({ location }) {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <nav className="profile-nav">
      {menuOptions.map((option, index) => (
        <Link
          to={option.link}
          onClick={() => setActiveLink(index)}
          className={location.pathname === option.link ? "active" : null}
        >
          <img src={option.img}></img>
          <span>{option.name}</span>
        </Link>
      ))}
    </nav>
  );
}

const menuOptions = [
  {
    name: "Personal Info",
    link: "/my-profile/personal-info",
    img: "/assets/personal-info.svg",
  },
  {
    name: "My Goals",
    link: "/my-profile/personal-goals",
    img: "/assets/target.svg",
  },
  {
    name: "Security",
    link: "/my-profile/security",
    img: "/assets/security.svg",
  },
];
