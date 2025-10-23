const connectDB = require("./config/db.js");
const express = require("express");
const dotenv = require("dotenv");
const expressMongoSanitize = require("@exortek/express-mongo-sanitize");

dotenv.config();

const app = express();
const port = process.env.PORT;

const foodRouter = require("./routes/foodRouter.js");
const userRouter = require("./routes/userRouter.js");
const healthRouter = require("./routes/healthRouter.js");
const activitiesRouter = require("./routes/activitiesRouter.js");

app.use(express.json());
app.use(express.urlencoded());
app.use(expressMongoSanitize());

//Connect to MongoDB
connectDB();

/*
e.g. {
  date: '2025-09-26',
  water: null,
  activites: [],
  _id: new ObjectId('68d6c8f515f0f6bdce61cf15'),
  foods: []
}*/

// Routers
app.use("/api/foods", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/health", healthRouter);
app.use("/api/activities", activitiesRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
