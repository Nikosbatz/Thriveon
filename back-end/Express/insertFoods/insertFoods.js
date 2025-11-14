import connectDB from "../config/db.js";
import dotenv from "dotenv";
import Food from "../models/food.model.js";
import { foods } from "./foods.js";

dotenv.config();

//Connect to MongoDB
connectDB();

try {
  const res = await Food.insertMany(foods, { ordered: false });
} catch (error) {
  console.log(error.message);
}
