import { useState } from "react";
import { login, register } from "../../api/requests";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirm_pass: "",
  });
  const [loginPending, setLoginPending] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserEmail } = useOutletContext();

  async function handleLoginRequest() {
    // set user email to <Auth/> state

    setLoginPending(true);
    try {
      const res = await login(
        loginForm.email.toLowerCase(),
        loginForm.password
      );
      setUserEmail(loginForm.email.toLowerCase());

      if (res.isVerified === true) {
        navigate("/app/dashboard");
      } else {
        navigate("/auth/verify-email");
      }
    } catch (err) {
      setLoginPending(false);
      alert("WRONG CREDENTIALS");
    }
  }

  // fix register to not save access token
  async function handleRegisterRequest() {
    // set user email to <Auth/> state
    setUserEmail(registerForm.email.toLowerCase());

    setLoginPending(true);
    if (registerForm.confirm_pass !== registerForm.password) {
      alert("Passwords should match!");
      setLoginPending(false);
      return;
    }

    if (registerForm.password.length < 8) {
      alert("Password length should be >=8");
      setLoginPending(false);
      return;
    }

    try {
      await register(registerForm.email.toLowerCase(), registerForm.password);
      navigate("../verify-email");
    } catch (error) {
      alert(error.message);
      setLoginPending(false);
    }
  }

  return (
    <div
      className={
        !registerClicked ? "login-container" : "login-container turned "
      }
    >
      <div className="inner-login">
        <div className="login-side">
          <h1>Welcome Back!</h1>
          <h2>Sign-In</h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault(); // prevents page reload
              handleLoginRequest();
            }}
          >
            <div className="input-pair">
              <label htmlFor="e-mail">E-mail:</label>
              <input
                id="e-mail"
                type="email"
                placeholder="E-mail"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="input-pair">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />

              {showPassword ? (
                <Eye
                  className="eye-icon"
                  onClick={() => setshowPassword((prev) => !prev)}
                ></Eye>
              ) : (
                <EyeOff
                  className="eye-icon"
                  onClick={() => setshowPassword((prev) => !prev)}
                ></EyeOff>
              )}
            </div>

            <Link to={"../forgot-password"} className="forgot-password">
              Forgot Password?
            </Link>

            {loginPending ? (
              <div className="loader2"></div>
            ) : (
              <button
                type="submit"
                className="button"
                onClick={handleLoginRequest}
              >
                Sign in
              </button>
            )}
          </form>
          <div
            className="register-here"
            onClick={() => setRegisterClicked((prev) => !prev)}
          >
            <span>Don't Have An Account?</span>
            <h2>Sign-Up!</h2>
          </div>
        </div>
        <div className="register-side">
          <h1>Become a Member</h1>
          <h2>Sign-up for Free</h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault(); // prevents page reload
              handleRegisterRequest();
            }}
          >
            <div className="input-pair">
              <label htmlFor="e-mail">E-mail:</label>
              <input
                id="e-mail"
                type="email"
                placeholder="E-mail"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>

            <div className="input-pair">
              <label htmlFor="password">Password:</label>
              <input
                className="password-input"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <div
                className="hint"
                style={{
                  color: registerForm.password.length >= 8 ? "#58eb34" : "red",
                }}
              >
                At least 8 characters
              </div>
              {showPassword ? (
                <Eye
                  className="eye-icon"
                  onClick={() => setshowPassword((prev) => !prev)}
                ></Eye>
              ) : (
                <EyeOff
                  className="eye-icon"
                  onClick={() => setshowPassword((prev) => !prev)}
                ></EyeOff>
              )}
            </div>
            <div className="input-pair">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={registerForm.confirm_pass}
                onChange={(e) =>
                  setRegisterForm((prev) => ({
                    ...prev,
                    confirm_pass: e.target.value,
                  }))
                }
              />
              {showPassword ? (
                <Eye
                  className="eye-icon"
                  onClick={() => setshowPassword((prev) => !prev)}
                ></Eye>
              ) : (
                <EyeOff
                  className="eye-icon"
                  onClick={() => setshowPassword((prev) => !prev)}
                ></EyeOff>
              )}
              <div
                className="hint"
                style={{
                  color:
                    registerForm.password.length >= 8 &&
                    registerForm.password === registerForm.confirm_pass
                      ? "#58eb34"
                      : "red",
                }}
              >
                Passwords Match
              </div>
            </div>

            {loginPending ? (
              <div className="loader2"></div>
            ) : (
              <button type="submit" className="button">
                Sign Up
              </button>
            )}
          </form>

          <div
            className="register-here"
            onClick={() => setRegisterClicked((prev) => !prev)}
          >
            <span>Already Have An Account?</span>
            <h2>Sign-In!</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
