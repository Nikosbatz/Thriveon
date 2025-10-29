const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  gender: { type: String, default: "" },
  age: { type: Number, default: null },
  weight: { type: Number, default: null },
  height: { type: Number, default: null },
  country: { type: String, default: "" },
  goal: { type: String, default: "" },
  nutritionGoals: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
  },
  healthGoals: {
    weight: Number,
    water: Number,
    activity: Number,
  },
  isVerified: Boolean,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiresAt: Date,
  onBoardingCompleted: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema); // Uses active DB connection

module.exports = User;
