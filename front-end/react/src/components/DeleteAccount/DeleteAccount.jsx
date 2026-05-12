import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { postDeleteAccount } from "../../api/requests";

export default function DeleteAccount() {
  const [acknowledgedTerms, setAcknowledgedTerms] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!acknowledgedTerms) {
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(emailInput);
    if (!emailRegex.test(emailInput)) {
      toast.error("Invalid e-mail.");
      setRequestPending(false);
      return;
    }
    setRequestPending(true);

    await postDeleteAccount(emailInput.toLowerCase());
    setFormSubmitted(true);
  }
  return (
    <div>
      <header className="privacy-header">
        <a
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img src="../assets/logo_transparent.png" alt="" />

          <h2>ThriveOn</h2>
        </a>
      </header>
      <main className="delete-account-main">
        <h2>Delete your ThriveOn account</h2>
        <h3>
          To delete your ThriveOn you have to enter your account's e-mail.{" "}
          <br /> A link will be sent to your e-mail to verify it is you. <br />{" "}
          After clicking the link sent to your e-mail your account and all its
          data will be deleted permanently.
        </h3>
        {formSubmitted ? (
          <div>
            <p style={{ color: "rgb(1, 202, 224)" }}>
              If an account is associated with this e-mail you will receive a
              link shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div id="email-input-container">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                id="email-input"
              />
            </div>
            <label id="terms-label">
              <input
                type="checkbox"
                onChange={() => setAcknowledgedTerms((prev) => !prev)}
                checked={acknowledgedTerms}
              ></input>
              <p>
                I acknowledge that this action will permanently <br></br>delete
                my account and all its data
              </p>
            </label>
            <button
              disabled={!acknowledgedTerms || requestPending}
              type="submit"
            >
              Send link
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
