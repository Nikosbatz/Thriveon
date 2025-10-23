const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, default: null },
  weight: { type: Number, default: null },
  height: { type: Number, default: null },
  goal: { type: String, default: null },
  dailyGoal: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
  },
  isVerified: Boolean,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiresAt: Date,
});

const User = mongoose.model("User", userSchema); // Uses active DB connection

module.exports = User;
