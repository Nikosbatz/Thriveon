import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Security() {
  const userProfile = useOutletContext();
  const [disabledInputs, setdisabledInputs] = useState(true);
  return (
    <div className="security-container">
      <button
        className={disabledInputs ? "edit-info-btn" : "edit-info-btn active"}
        onClick={() => {
          setdisabledInputs((prev) => !prev);
        }}
      >
        {disabledInputs ? "edit info" : "save changes"}
        <img src="/assets/edit.png"></img>
      </button>
      <div className="title-container">
        <img src="/assets/security-secondary.svg" alt="" />
        <h2>Security Settings</h2>
      </div>
      <div className="security-settings">
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Mobile Number</span>
          <input disabled={disabledInputs} value={"6975981902"}></input>
        </div>
        <div className={disabledInputs ? "info-pair" : "info-pair active"}>
          <span>Multi Factor Authentication</span>
          <input disabled={disabledInputs} value={"Disabled"}></input>
        </div>
      </div>
    </div>
  );
}
