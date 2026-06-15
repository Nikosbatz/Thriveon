const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    grams: { type: Number, required: true },
    fiber: Number,
    sodium: Number,
    logs: { type: Number, default: 0 },
    starred: { type: Boolean, default: false },
    imageLink: { type: String, required: true },
    description: { type: String, required: true },
    steps: { type: [String], required: true },
    ingredients: { type: [String], required: true },
    time: { type: Number, required: true },
  },

  {
    strict: true,
  },
);

const Recipe = mongoose.model("Recipe", recipeSchema); // Uses active DB connection

module.exports = Recipe;
