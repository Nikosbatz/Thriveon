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

healthRouter.get("/water-logs", getUserWaterLog);
healthRouter.post("/water-logs", postUserWaterLog);
healthRouter.get("/weight-logs", getUserWeightLogs);
healthRouter.post("/weight-logs", postUserWeightLog);

module.exports = healthRouter;
