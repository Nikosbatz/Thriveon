const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, userIdDecoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }
    req.userId = userIdDecoded.id;
    next();
  });
}

module.exports = authenticateToken;
