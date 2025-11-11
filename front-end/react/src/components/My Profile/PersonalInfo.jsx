import { useState, useContext, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext/UserContext";
import { schema } from "../utilities/formSchemaValidation";
import toast from "react-hot-toast";

export default function Personalinfo() {
  // Takes Context from the Outlet element in MyProfileLayout
  const { userProfile, updateInfo } = useContext(UserContext);
  const [infoInputs, setInfoInputs] = useState(userProfile);
  const [disabledInputs, setdisabledInputs] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setInfoInputs(userProfile);
    }
  }, [userProfile]);

  // Validate changes and make a POST request to back-end
  async function handleSaveChanges() {
    setLoading(true);

    console.log(infoInputs.gender);
    try {
      // validate inputs
      schema.validateSync(infoInputs, { abortEarly: false });

      // Send request to back-end VIA userContext's "updateInfo()"
      await updateInfo(infoInputs);
      setdisabledInputs(true);
    } catch (error) {
      // Show multiple toasts if multiple validation errors occur
      if (error.inner && error.inner.length > 0) {
        error.inner.forEach((err) => toast.error(err.message));
      } else {
        // if only 1 error then show toast
        toast.error(error.message);
        return;
      }
    }
    setLoading(false);
  }

  console.log(infoInputs);

  return (
    <div className="personal-info">
      <button
        className={disabledInputs ? "edit-info-btn" : "edit-info-btn active"}
        onClick={
          disabledInputs
            ? () => {
                setdisabledInputs((prev) => !prev);
              }
            : handleSaveChanges
        }
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
      {/* Create Profile Form Inputs component to avoid re-writing code for each page */}
      <dl>
        {fields.map(({ label, key }) => (
          <div
            key={key}
            className={disabledInputs ? "info-pair" : "info-pair active"}
          >
            <span>{label}:</span>
            <input
              disabled={disabledInputs}
              value={infoInputs[key]}
              onChange={(e) =>
                setInfoInputs((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          </div>
        ))}
      </dl>
      <button className="change-password-btn">
        Change Password <img src="/assets/password.svg" alt="" />
      </button>
      <div className={loading ? "loading-overlay active" : "loading-overlay"}>
        <div className="loader2"></div>
      </div>
    </div>
  );
}

const fields = [
  { label: "E-mail", key: "email" },
  { label: "Age", key: "age" },
  { label: "Height", key: "height" },
  { label: "Weight", key: "weight" },
  { label: "Country", key: "country" },
  { label: "Gender", key: "gender" },
];
