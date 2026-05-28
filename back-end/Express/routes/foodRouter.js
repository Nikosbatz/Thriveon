const {
  createFood,
  getFoods,
  deleteUserLogsFood,
  getUserLogsFood,
  updateFood,
  logUserFood,
  getUserFoods,
  getBarcodeFood,
  getSearchFoods,
  createRecipe,
  deleteRecipe,
} = require("../controllers/foodController.js");
const authenticateToken = require("../middleware/authMiddleware.js");
const express = require("express");
const foodRouter = express.Router();

// utilize authMiddleware before each controller
foodRouter.use(authenticateToken);

foodRouter.get("/", getFoods);

foodRouter.post("/", createFood);

foodRouter.get("/search/:id", getSearchFoods);

foodRouter.get("/barcode/:id", getBarcodeFood);

foodRouter.get("/userlogs/:id", getUserFoods);

foodRouter.post("/userlogs/recipes", createRecipe);

foodRouter.post("/userlogs/:date", logUserFood);

foodRouter.delete("/userlogs/recipes/:recipeId", deleteRecipe);

foodRouter.delete("/userlogs/:date/:foodId", deleteUserLogsFood);

module.exports = foodRouter;
