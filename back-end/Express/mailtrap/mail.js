const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates");
const { transport } = require("./mailtrap.config");

async function sendVerificationEmail(email, verificationToken) {
  const sender = {
    address: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };

  const recipients = [email];
  console.log(email);

  try {
    const result = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "You are awesome!",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{VERIFICATION_TOKEN}",
        verificationToken
      ),
      category: "Integration Test",
    });
  } catch (error) {
    //console.log(error.message);
    throw new Error("Verification email wasnt send to the user");
  }
}

async function sendPasswordResetEmail(email, resetToken) {
  const URI = process.env.CLIENT_URI + `/auth/reset-password/${resetToken}`;
  const sender = {
    address: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };

  const recipients = [email];

  try {
    const result = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Password Reset Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", URI),
      category: "Integration Test",
    });
  } catch (error) {
    console.log("PASSWORD RESET EMAIL NOT SEND");
    throw new Error("Error sending pass reset email to user");
  }
}

async function sendPasswordResetSuccessEmail(email) {
  const sender = {
    address: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };

  const recipients = [email];

  try {
    const result = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "Password Reset Success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Integration Test",
    });
  } catch (error) {
    console.log("PASSWORD RESET SUCCESS EMAIL NOT SEND");
    throw new Error("Error sending pass successful reset email to user");
  }
}

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
};
