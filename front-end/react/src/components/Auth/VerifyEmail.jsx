import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  postEmailVerificationToken,
  getEmailVerificationToken,
} from "../../api/requests";
import { useNavigate, Link, useOutletContext } from "react-router-dom";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeResent, setCodeResent] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { userEmail } = useOutletContext();

  // Do not let users load this page without loging in or registering first
  useEffect(() => {
    if (!userEmail) {
      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  async function handleSubmit() {
    const verificationCode = code.join("");

    try {
      const res = await postEmailVerificationToken(verificationCode);
      toast.success("Email verified successfully", {
        duration: 4000,
      });
      navigate("/app/dashboard");
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  }

  async function handleRequestVerificationCode() {
    setCodeResent(true);
    try {
      const res = await getEmailVerificationToken(userEmail);
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleInputChange(index, value) {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  return (
    <div className="verify-email-container modal">
      <h2>VERIFY EMAIL</h2>
      <span>Enter the 6-digit code sent to your E-mail</span>
      <form className="verify-email-form">
        <div className="inputs-container">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="6"
              value={digit}
              type="number"
              autoComplete="off"
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
      </form>
      {!codeResent ? (
        <span onClick={handleRequestVerificationCode}>
          Resend verification code
        </span>
      ) : (
        <span className="resent">
          Verification Code re-sent to your e-mail !
        </span>
      )}
    </div>
  );
}
