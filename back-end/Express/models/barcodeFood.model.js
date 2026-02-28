const mongoose = require("mongoose");

const barcodeFoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
  },
  {
    strict: false,
  },
);

const BarcodeFood = mongoose.model("BarcodeFood", barcodeFoodSchema); // Uses active DB connection

module.exports = BarcodeFood;
