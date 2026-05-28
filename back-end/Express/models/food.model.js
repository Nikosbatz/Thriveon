const mongoose = require("mongoose");
const { loggedFoodSchema } = require("./foodLog.model");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    fiber: Number,
    sodium: Number,
    grams: Number,
    portions: [
      {
        modifier: String,
        amount: Number,
        gramWeight: Number,
        label: String,
      },
    ],
    logs: Number,
    starred: Boolean,
  },

  {
    strict: true,
  },
);

const Food = mongoose.model("Food", foodSchema); // Uses active DB connection

module.exports = Food;
