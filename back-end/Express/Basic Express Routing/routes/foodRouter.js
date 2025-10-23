const {
  createFood,
  getFoods,
  deleteUserLogsFood,
  getUserLogsFood,
  updateFood,
  logUserFood,
  getUserFoods,
} = require("../controllers/foodController.js");
const authenticateToken = require("../middleware/authMiddleware.js");
const express = require("express");
const foodRouter = express.Router();

// utilize authMiddleware before each controller
foodRouter.use(authenticateToken);

foodRouter.get("/", getFoods);

foodRouter.post("/", createFood);

foodRouter.post("/userlogs", logUserFood);

foodRouter.get("/userlogs", getUserFoods);

// maybe redundant
foodRouter.delete("/userlogs/:id", deleteUserLogsFood);
foodRouter.get("/userlogs/:id", getUserLogsFood);
foodRouter.put("/:id", updateFood);
//------

module.exports = foodRouter;
