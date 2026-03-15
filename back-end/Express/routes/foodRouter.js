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

foodRouter.post("/userlogs", logUserFood);

foodRouter.get("/userlogs", getUserFoods);

foodRouter.delete("/userlogs/:id", deleteUserLogsFood);

module.exports = foodRouter;
