import { useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import { postResetPassword } from "../../api/requests";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setconfirmPasswordInput] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const resetToken = useParams().id;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !(
        confirmPasswordInput.length >= 8 &&
        confirmPasswordInput === passwordInput
      )
    ) {
      toast.error(
        "Password is less than 8 characters \nor \nPasswords do not match"
      );
      return;
    }

    console.log(resetToken);
    try {
      await postResetPassword(passwordInput, resetToken);
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message, {
        style: {
          background: "#1e293b", // dark background
          color: "#fff",
          fontWeight: "600",
          borderRadius: "8px",
          padding: "12px 16px",
        },
      });
    }
  }

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>

      <form className="reset-password-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <Lock className="lock-img"></Lock>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <img
            onClick={() => setshowPassword((prev) => !prev)}
            src={
              showPassword
                ? "/assets/eye_open_white.svg"
                : "/assets/eye_closed_white.svg"
            }
            alt=""
          />
          <div
            className="hint"
            style={{
              color: passwordInput.length >= 8 ? "#58eb34" : "red",
            }}
          >
            At least 8 characters
          </div>
        </div>
        <div className="input-container">
          <Lock className="lock-img"></Lock>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPasswordInput}
            onChange={(e) => setconfirmPasswordInput(e.target.value)}
          />
          <img
            onClick={() => setshowPassword((prev) => !prev)}
            src={
              showPassword
                ? "/assets/eye_open_white.svg"
                : "/assets/eye_closed_white.svg"
            }
            alt=""
          />
          <div
            className="hint"
            style={{
              color:
                confirmPasswordInput.length >= 8 &&
                confirmPasswordInput === passwordInput
                  ? "#58eb34"
                  : "red",
            }}
          >
            Passwords Match
          </div>
        </div>
        <button type="submit">Set New Password</button>
      </form>
      <span>
        *You will be redirected to Login page upon setting your new password
      </span>
    </div>
  );
}
