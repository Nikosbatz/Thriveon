import { act, useState } from "react";
import { Link } from "react-router-dom";
import { IdCard, Crosshair, ShieldHalf } from "lucide-react";

export default function ProfileNav({ location }) {
  const [activeLink, setActiveLink] = useState(0);

  console.log(menuOptions[activeLink]);

  return (
    <nav className="profile-nav">
      {menuOptions.map((option, index) => (
        <Link
          to={option.link}
          onClick={() => setActiveLink(index)}
          className={location.pathname.includes(option.link) ? "active" : null}
        >
          {option.iconElement}
          <span>{option.name}</span>
        </Link>
      ))}
    </nav>
  );
}

const menuOptions = [
  {
    name: "Personal Info",
    link: "personal-info",
    iconElement: <IdCard></IdCard>,
  },
  {
    name: "My Goals",
    link: "personal-goals",
    iconElement: <Crosshair></Crosshair>,
  },
  {
    name: "Security",
    link: "security",
    iconElement: <ShieldHalf></ShieldHalf>,
  },
];
