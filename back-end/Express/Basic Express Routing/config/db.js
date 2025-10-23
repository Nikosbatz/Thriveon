const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
  const connectionURI = process.env.MONGO_URI;
  try {
    await mongoose.connect(connectionURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = connectDB;
