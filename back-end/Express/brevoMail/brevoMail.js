// utils/sendVerificationEmail.js

import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

export async function sendVerificationEmail(userEmail, verificationToken) {
  let emailAPI = new TransactionalEmailsApi();
  emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_TOKEN;

  console.log(userEmail);

  let message = new SendSmtpEmail();
  message.subject = "Verify Your Email";
  message.sender = {
    email: "nikosbatznanas@gmail.com",
    name: "ThriveOn",
  };
  message.to = [{ email: userEmail }];
  message.htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{VERIFICATION_TOKEN}",
    verificationToken
  );

  try {
    const res = await emailAPI.sendTransacEmail(message);
    console.log("Mail Sent Successfully");
    return { success: true };
  } catch (error) {
    console.error(
      "Email sending error:",
      error.response?.body || error.message
    );
    throw new Error("Email sending failed");
  }
}

export async function sendPasswordResetEmail(userEmail, resetToken) {
  console.log("SEND PASSWORD RESET EMAIL");
  let emailAPI = new TransactionalEmailsApi();
  emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_TOKEN;

  let URI = null;
  if (process.env.NODE_ENV === "production") {
    URI = process.env.CLIENT_URI + `/auth/reset-password/${resetToken}`;
  } else {
    console.log(process.env.DEV_CLIENT_URI);
    URI = process.env.DEV_CLIENT_URI + `/auth/reset-password/${resetToken}`;
  }

  let message = new SendSmtpEmail();
  message.subject = "Password Reset Request";
  message.sender = {
    email: "nikosbatznanas@gmail.com",
    name: "ThriveOn",
  };
  message.to = [{ email: userEmail }];
  message.htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    URI
  );

  try {
    const res = await emailAPI.sendTransacEmail(message);
    console.log("Reset Password Mail Sent Successfully");
    return { success: true };
  } catch (error) {
    console.log("PASSWORD RESET EMAIL WAS NOT SEND");
    throw new Error("Error sending pass reset email to user");
  }
}

export async function sendPasswordResetSuccessEmail(userEmail) {
  let emailAPI = new TransactionalEmailsApi();
  emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_TOKEN;

  let message = new SendSmtpEmail();
  message.subject = "Password Reset Success";
  message.sender = {
    email: "nikosbatznanas@gmail.com",
    name: "ThriveOn",
  };
  message.to = [{ email: userEmail }];
  message.htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE;

  try {
    const res = await emailAPI.sendTransacEmail(message);
    console.log("Reset Password Success Mail Sent Successfully");
    return { success: true };
  } catch (error) {
    console.log("PASSWORD RESET SUCCESS EMAIL NOT SEND");
    throw new Error("Error sending pass successful reset email to user");
  }
}
