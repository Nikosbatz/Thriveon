const connectDB = require("./config/db.js");
const express = require("express");
const dotenv = require("dotenv");
const htmlSanitizer = require("./sanitizers/htmlSanitizer.js");
const mongoSanitizer = require("./sanitizers/mongoSanitizer.js");
const path = require("path");
const helmet = require("helmet");

dotenv.config();

const app = express();
const port = process.env.PORT;

const foodRouter = require("./routes/foodRouter.js");
const userRouter = require("./routes/userRouter.js");
const healthRouter = require("./routes/healthRouter.js");
const activitiesRouter = require("./routes/activitiesRouter.js");

app.use(helmet());
app.use(express.json({ limit: "10kb" })); // Reject big payloads that exceed 10kb
app.use(express.urlencoded());
app.use(htmlSanitizer);
app.use(mongoSanitizer);

//Connect to MongoDB
connectDB();

// Routers
app.use("/api/foods", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/health", healthRouter);
app.use("/api/activities", activitiesRouter);

console.log(process.env.NODE_ENV === "production");

// PRODUCTION MODE ONLY
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../front-end/react/build")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../front-end/react/build/index.html"),
    );
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}!`));
