const {
  createUser,
  loginUser,
  forgotPassword,
  verifyUser,
  resetPassword,
} = require("../controllers/userController.js");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify-email", verifyUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

module.exports = userRouter;
