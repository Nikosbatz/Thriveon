const {
  getUserWaterLog,
  postUserWaterLog,
  getUserWeightLogs,
  postUserWeightLog,
} = require("../controllers/healthController.js");
const authenticateToken = require("../middleware/authMiddleware.js");

const express = require("express");
const healthRouter = express.Router();

healthRouter.use(authenticateToken);

healthRouter.get("/water-logs/:date", getUserWaterLog);
healthRouter.post("/water-logs/:date", postUserWaterLog);
healthRouter.get("/weight-logs/:date", getUserWeightLogs);
healthRouter.post("/weight-logs/:date", postUserWeightLog);

module.exports = healthRouter;
