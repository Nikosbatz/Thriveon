import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { postForgotPasswordEmail } from "../../api/requests";

export default function ForgotPassword() {
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await postForgotPasswordEmail(emailInput);
    } catch (error) {}
  }
  return (
    <div className="forgot-password-container">
      <h2>FORGOT PASSWORD</h2>
      {!isSubmitted ? (
        <form
          className="forgot-password-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <span>
            Enter your E-mail address and we will send you a link to reset your
            password.
          </span>
          <div className="input-container">
            <Mail className="mail-img"></Mail>
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              type="text"
            />
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
      ) : (
        <div className="after-submit-container">
          <Mail className="mail-img"></Mail>
          <span>
            If an account exists for{" "}
            <b style={{ color: "rgb(144, 207, 226)" }}>{emailInput}</b>, you
            will receive a password reset link shortly.
          </span>
        </div>
      )}

      <div className="back-to-login">
        <ArrowLeft></ArrowLeft>
        <Link to={"../login"}> Back to Login</Link>
      </div>
    </div>
  );
}
