const {
  getTodayUserActivities,
  postTodayUserActivity,
} = require("../controllers/activitesController");
const authenticateToken = require("../middleware/authMiddleware.js");

const express = require("express");
const activitiesRouter = express.Router();

// utilize authMiddleware before each controller
activitiesRouter.use(authenticateToken);

activitiesRouter.get("/user-logs", getTodayUserActivities);
activitiesRouter.post("/user-logs", postTodayUserActivity);

module.exports = activitiesRouter;
