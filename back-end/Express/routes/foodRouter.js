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
  createMyFood,
  deleteMyFood,
  getRecipes,
} = require("../controllers/foodController.js");
const authenticateToken = require("../middleware/authMiddleware.js");
const express = require("express");
const foodRouter = express.Router();

// utilize authMiddleware before each controller
foodRouter.use(authenticateToken);

foodRouter.get("/", getFoods);

foodRouter.get("/search/:id", getSearchFoods);

foodRouter.get("/barcode/:id", getBarcodeFood);

foodRouter.get("/userlogs/:id", getUserFoods);

foodRouter.get("/recipes", getRecipes);

foodRouter.post("/", createFood);

foodRouter.post("/userlogs/myfoods", createMyFood);

foodRouter.post("/userlogs/:date", logUserFood);

foodRouter.delete("/userlogs/myfoods/:myFoodId", deleteMyFood);

foodRouter.delete("/userlogs/:date/:foodId", deleteUserLogsFood);

module.exports = foodRouter;
