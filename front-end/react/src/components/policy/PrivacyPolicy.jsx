import { privacyPolicyHTML } from "./texts";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-root">
      <header className="privacy-header">
        <img src="../assets/logo_transparent.png" alt="" />

        <h2>ThriveOn</h2>
      </header>
      <main className="policy-content-container">
        <div
          className="policy-content"
          dangerouslySetInnerHTML={{ __html: privacyPolicyHTML }}
        />
      </main>
    </div>
  );
}
