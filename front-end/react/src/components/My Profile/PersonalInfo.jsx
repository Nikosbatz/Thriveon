import { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";

export default function Personalinfo() {
  // Takes Context from the Outlet element in MyProfileLayout
  const userProfile = useOutletContext();
  const [disabledInputs, setdisabledInputs] = useState(true);

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
      <h2>{userProfile.firstName + " " + userProfile.lastName}</h2>
      {/*TODO: PREPEI NA ALLAXEI TO "dl" se "form" */}
      <dl>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Name:</span>
          <input
            disabled={disabledInputs}
            value={userProfile.firstName + " " + userProfile.lastName}
          ></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>E-mail:</span>
          <input disabled={disabledInputs} value={userProfile.email}></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>age:</span>
          <input disabled={disabledInputs} value={userProfile.age}></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>height:</span>
          <input disabled={disabledInputs} value={userProfile.height}></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>weight:</span>
          <input disabled={disabledInputs} value={userProfile.weight}></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>country:</span>
          <input disabled={disabledInputs} value={userProfile.country}></input>
        </div>
      </dl>
      <button className="change-password-btn">
        Change Password <img src="/assets/password.svg" alt="" />
      </button>
    </div>
  );
}
