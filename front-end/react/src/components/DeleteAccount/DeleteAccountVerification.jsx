import { useState } from "react";
import { sendDeleteAccountToken } from "../../api/requests";
import { useParams } from "react-router-dom";

export default function DeleteAccountVerification() {
  const [deletePressed, setDeletePressed] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const deleteToken = useParams().token;

  async function handleDeletePressed() {
    setDeletePressed(true);
    try {
      await sendDeleteAccountToken(deleteToken);
      setDeleteSuccess(true);
    } catch (error) {
      alert(error.message);
      setDeletePressed(false);
    }

    setDeletePressed(false);
  }

  //TODO: Implement an async function to send the token to to the backend to verify the deletion
  //   TODO: and make the request function in requests.js
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
        {deleteSuccess ? (
          <h3 style={{ color: "red" }}>
            Your account and all its data were deleted! <br></br>We hope to see
            you again soon
          </h3>
        ) : (
          <>
            <h3 style={{ color: "red" }}>
              Warning by clicking the following button all your data on ThriveOn
              will be deleted permanently!
            </h3>
            <button
              disabled={deletePressed}
              onClick={handleDeletePressed}
              id="delete-button"
            >
              Delete my account
            </button>
          </>
        )}
      </main>
    </div>
  );
}
