const jwt = require("jsonwebtoken");
const throwError = require("../utils/throwError");

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return throwError(401, "Unauthorized", res);
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return throwError(401, "Unauthorized", res);
  }
};
module.exports = validateToken;
