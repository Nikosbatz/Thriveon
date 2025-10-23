const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const FoodLog = require("../models/foodLog.model.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} = require("../mailtrap/mail.js");

async function createUser(req, res) {
  const userData = req.body;

  console.log("CREATE USER");

  try {
    // Check if a user with userdata.email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPass = await bcrypt.hash(userData.password, 10);
    console.log(hashedPass);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create User with requested data
    const user = await User.create({
      username: userData.email,
      email: userData.email,
      password: hashedPass,
      isVerified: false,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Create mongoDB document in foodlogs collection for the created User
    const log = await FoodLog.create({
      userId: user._id,
      nutritionlogs: [],
    });

    const emailResult = await sendVerificationEmail(
      userData.email,
      verificationToken
    );
    const token = generateAccessToken(user._id);

    res.status(201).json({ accessToken: token });
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: "Error 409\nUser could not be created!" });
  }
}

async function verifyUser(req, res) {
  const { verificationToken } = req.body;

  try {
    // check if User with this verificationToken exists and token is valid
    const user = await User.findOne({
      verificationToken: verificationToken,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    // if queried user doesnt exist return "400 Bad Request"
    if (!user) {
      return res.status(400).json({ message: "Code is Invalid or Incorrect." });
    }

    // update values in User document
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.isVerified = true;
    await user.save();

    // return OK status
    return res.status(200).send();
  } catch (error) {
    console.log("ERROR! COULDNT VERIFY USER");
    res.status(500).json({ message: "User couldnt be verified " });
  }
}

async function loginUser(req, res) {
  const userData = req.body;
  const userEmail = userData.email;
  const userPass = userData.password;

  try {
    // Check if user exists
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(401).json({ message: "User not found" });

    // Check if given password and DB-password match
    const passMatch = await bcrypt.compare(userPass, user.password);
    console.log(passMatch);
    if (!passMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateAccessToken(user._id);
    console.log(token);

    res.status(200).json({ accessToken: token });
  } catch (error) {}
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    // Find User by Email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    // Create Reset Token. Expires in 1 Hour
    const resetToken = crypto.randomBytes(20).toString("hex");
    const tokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = tokenExpiresAt;
    await user.save();

    // Send a url with the resetToken to the User's Email
    sendPasswordResetEmail(email, resetToken);

    res
      .status(200)
      .json({ message: "Password Reset Email was sent to the user!" });
  } catch (error) {
    res.status(400);
  }
}

async function resetPassword(req, res) {
  console.log("RESET PASSWORD");

  const { token } = req.params;
  const { password } = req.body;

  console.log(token);

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Password Reset Link!" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    console.log(user.email);
    await user.save();

    await sendPasswordResetSuccessEmail(user.email);

    res.status(200).json({ message: "Succesful Password Reset!" });
  } catch (error) {
    console.log("Error in resetPassword func: ", error);
    res.status(400).json({ message: error.message });
  }
}

function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  verifyUser,
  resetPassword,
};
