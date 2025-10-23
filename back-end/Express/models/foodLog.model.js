const mongoose = require("mongoose");

const foodLogSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  logs: [
    {
      date: { type: String, required: true },
      foods: {
        type: [
          {
            name: String,
            grams: Number,
            calories: Number,
            protein: Number,
            carbs: Number,
            fats: Number,
            mealType: String,
          },
        ],
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

foodLogSchema.index({ userId: 1, date: 1 }, { unique: true });

const FoodLog = mongoose.model("FoodLog", foodLogSchema);

module.exports = FoodLog;
