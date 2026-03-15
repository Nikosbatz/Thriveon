const mongoose = require("mongoose");

// Helper Schema
const loggedFoodSchema = new mongoose.Schema(
  {
    foodId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    grams: { type: Number, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    mealType: { type: String, required: true },
    brands: String,
  },
  { strict: false },
);

// MAIN Schema
const foodLogSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  foodHistory: { type: [{}], default: [] },
  logs: [
    {
      date: { type: String, required: true },
      foods: {
        type: [loggedFoodSchema],
        default: [],
      },
      water: { type: Number, default: null },
      weight: { type: Number, default: null },
      activities: {
        type: [
          {
            activityType: String,
            duration: Number,
            calories: Number,
          },
        ],
        default: [],
      },
    },
  ],
});

foodLogSchema.index({ userId: 1, "logs.date": 1 }, { unique: true });

const FoodLog = mongoose.model("FoodLog", foodLogSchema);

module.exports = FoodLog;
