const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  calories: { type: Number, required: true },
  grams: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
});

const Food = mongoose.model("Food", foodSchema); // Uses active DB connection

module.exports = Food;
