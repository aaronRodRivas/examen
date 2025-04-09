const jwt = require("jsonwebtoken");
const { isInBlacklist } = require("../utils/accessTokenBlacklist");

const authMiddleware = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken || !accessToken.startsWith("Bearer ") || isInBlacklist(accessToken.split(" ")[1]))
    return res.status(403).json({ message: "Incorrect Token!" });
  try {
    req.user = jwt.verify(accessToken.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized!" });
  }
}

module.exports = authMiddleware;