const {
  createUser,
  loginUser,
  forgotPassword,
  verifyUser,
  resetPassword,
  updateInfo,
  authToken,
  getInfo,
  sendVerificationCode,
} = require("../controllers/userController.js");
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware.js");

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify-email", verifyUser);
userRouter.post("/resend-verification-code", sendVerificationCode);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

userRouter.use(authenticateToken);

userRouter.get("/info", getInfo);
userRouter.post("/update-info", updateInfo);
userRouter.post("/auth", authToken);

module.exports = userRouter;
