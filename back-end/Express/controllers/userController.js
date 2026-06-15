const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const FoodLog = require("../models/foodLog.model.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
  sendDeleteAccountEmail,
} = require("../brevoMail/brevoMail");
const {
  //sendVerificationEmail,
  //sendPasswordResetEmail,
  //sendPasswordResetSuccessEmail,
} = require("../mailtrap/mail.js");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function createUser(req, res) {
  const userData = req.body;

  try {
    // Check if a user with userdata.email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPass = await bcrypt.hash(userData.password, 10);

    // createi verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Try to send verification email
    // if send fails then throws Error and account is not created
    try {
      const emailResult = await sendVerificationEmail(
        userData.email,
        verificationToken,
      );
    } catch (error) {
      //catch the cannot send email error
      throw new Error();
    }

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

    res.status(201).json({ message: "Successful register" });
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

    const token = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // return OK status
    return res
      .status(200)
      .json({ accessToken: token, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: "User couldnt be verified " });
  }
}

async function sendVerificationCode(req, res) {
  const userEmail = req.body.email;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) return res.status(401).json({ message: "User not found" });

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const emailResult = await sendVerificationEmail(
      userEmail,
      verificationToken,
    );
  } catch (error) {
    res.status(400).json({ message: "Could not send email to user" });
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

    if (!passMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Check if user is Verified
    if (!user.isVerified)
      return res
        .status(403)
        .json({ email: userEmail, isVerified: user.isVerified });

    const token = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Remove sensitive info from the user object
    const { __v, password, mfa, ...safeUser } = user._doc;

    res.status(200).json({
      accessToken: token,
      refreshToken: refreshToken,
      isVerified: user.isVerified,
      user: safeUser,
    });
  } catch (error) {}
}

async function googleAuthUser(req, res) {
  const googleData = req.body.googleData;

  try {
    // Verify Google data from front-end
    const ticket = await client.verifyIdToken({
      idToken: googleData.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    // use authorized data for further operations
    const authPayload = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email: authPayload.email });
    let messageToSend = "signing in with google";
    if (user) {
      // if user exists as a local account link local and google accounts as one
      if (
        user.password &&
        (user.googleId === null || user.googleId === undefined)
      ) {
        user.googleId = authPayload.sub;
        messageToSend = "Linked already existing account with googleId";
      }
      // auto enable autoLogin
      user.autoLoginEnabled = true;
      await user.save();

      res.status(200);
    } else if (!user) {
      // Create User with requested data
      user = await User.create({
        username: authPayload.email,
        email: authPayload.email,
        googleId: authPayload.sub,
        isVerified: true,
      });

      // Create mongoDB document in foodlogs collection for the created User
      const log = await FoodLog.create({
        userId: user._id,
        nutritionlogs: [],
      });

      messageToSend = "Created new user with googleId";
      res.status(201);
    }

    // Generate JWT token
    const token = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Remove sensitive info from the user object
    const { __v, password, mfa, googleId, ...safeUser } = user._doc;

    res.json({
      user: safeUser,
      message: messageToSend,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send();
  }
}

async function forgotPassword(req, res) {
  const { email, platform } = req.body;

  // If platform is DESKTOP (platform === undefined for desktop)
  if (!platform) {
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
  // Else if platform === "mobile"
  else {
    //TODO: change email template for mobile platform

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }

      const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
      const tokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
      user.resetPasswordToken = resetToken;
      user.resetPasswordTokenExpiresAt = tokenExpiresAt;
      await user.save();

      // Send a url with the resetToken to the User's Email
      sendPasswordResetEmail(email, resetToken, platform);

      res
        .status(200)
        .json({ message: "Password Reset Email was sent to the user!" });
    } catch (error) {
      res.status(400);
    }
  }
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

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

    await user.save();

    await sendPasswordResetSuccessEmail(user.email);

    res.status(200).json({ message: "Succesful Password Reset!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getInfo(req, res) {
  const userId = req.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(401).send();
    }

    //Exclude sensitive properties from the returning object
    const { __v, password, mfa, ...safeUser } = user._doc;
    res.status(200).json(safeUser);
  } catch (error) {
    res.status(500).send();
  }
}

async function updateInfo(req, res) {
  const userId = req.userId;
  const body = req.body;

  body.onBoardingCompleted = true;
  const allowedFields = [
    "username",
    "age",
    "weight",
    "height",
    "gender",
    "country",
    "goal",
    "nutritionGoals",
    "healthGoals",
    "onBoardingCompleted",
    "autoLoginEnabled",
  ];

  try {
    // filter body and keep only the allowedFields keys, then reduce the filtered keys in a new object {filtered_key: value}
    const updates = Object.keys(body)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    const { password, ...safeUser } = user._doc;
    res.status(200).json({ ...safeUser });
  } catch (error) {
    res.status(500).send();
  }
}

async function deleteAccountRequest(req, res) {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error();
    }

    // Create Reset Token. Expires in 1 Hour
    const deleteAccountToken = crypto.randomBytes(20).toString("hex");
    const deleteAccountTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.deleteAccountToken = deleteAccountToken;
    user.deleteAccountTokenExpiresAt = deleteAccountTokenExpiresAt;
    await user.save();

    // Send a url with the resetToken to the User's Email
    await sendDeleteAccountEmail(email, deleteAccountToken);

    res
      .status(200)
      .json({ message: "Password Reset Email was sent to the user!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteAccount(req, res) {
  const { token } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findOne({
      deleteAccountToken: token,
      deleteAccountTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Password Reset Link!" });
    }

    // Try to DELETE user data
    await FoodLog.deleteOne({
      userId: user._id,
    });
    await User.deleteOne({ _id: user._id });

    // If we got here, both were successful. Commit the changes
    await session.commitTransaction();

    return res.status(200).send();
  } catch (error) {
    // If anything fails, undo everything (rollback)
    await session.abortTransaction();
    return res.status(500).send();
  } finally {
    session.endSession();
  }
}

// authMiddleware is used before this function
async function authToken(req, res) {
  res.status(200).send();
}

async function refreshToken(req, res) {
  const refreshToken = req.body.refreshToken; // Or req.cookies.refreshToken if using cookies

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  // 2. Verify the token
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, decodedUserId) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Refresh token expired or invalid" });
      }

      // 3. Issue a new access token
      const newAccessToken = generateAccessToken(decodedUserId.id);

      return res.status(201).json({ accessToken: newAccessToken });
    },
  );
}

function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30m" });
}

function generateRefreshToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1y",
  });
}

module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  verifyUser,
  resetPassword,
  updateInfo,
  authToken,
  getInfo,
  sendVerificationCode,
  googleAuthUser,
  deleteAccountRequest,
  deleteAccount,
  refreshToken,
};
