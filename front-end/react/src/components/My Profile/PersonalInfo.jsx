import { useState, useContext } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext/UserContext";

export default function Personalinfo() {
  // Takes Context from the Outlet element in MyProfileLayout
  const { userProfile } = useContext(UserContext);
  const [disabledInputs, setdisabledInputs] = useState(true);

  console.log(userProfile);

  return (
    <div className="personal-info">
      <button
        className={disabledInputs ? "edit-info-btn" : "edit-info-btn active"}
        onClick={() => {
          setdisabledInputs((prev) => !prev);
        }}
      >
        {disabledInputs ? "edit info" : "save changes"}
        <img src="/assets/edit.png"></img>
      </button>

      <img
        id="avatar-img"
        src={userProfile.avatar ? userProfile.avatar : "/assets/darth-maul.svg"}
      ></img>
      {/*<h2>{userProfile.firstName + " " + userProfile.lastName}</h2>*/}
      {/*TODO: PREPEI NA ALLAXEI TO "dl" se "form" */}
      <dl>
        {fields.map(({ label, key }) => (
          <div
            key={key}
            className={disabledInputs ? "info-pair" : "info-pair active"}
          >
            <span>{label}:</span>
            <input disabled={disabledInputs} value={userProfile[key]} />
          </div>
        ))}
      </dl>
      <button className="change-password-btn">
        Change Password <img src="/assets/password.svg" alt="" />
      </button>
    </div>
  );
}

const fields = [
  { label: "E-mail", key: "email" },
  { label: "Age", key: "age" },
  { label: "Height", key: "height" },
  { label: "Weight", key: "weight" },
  { label: "Country", key: "country" },
];
