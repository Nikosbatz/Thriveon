const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // Safely extract the token from "Bearer <TOKEN>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUserId) => {
    if (err) {
      console.log(err);
      // 401 signals to the frontend that the token is invalid/expired
      return res
        .status(401)
        .json({ message: "Access token expired or invalid" });
    }

    // Assuming your token payload looks like: { id: "user_id_here" }
    req.userId = decodedUserId.id;
    next();
  });
}

module.exports = authenticateToken;
