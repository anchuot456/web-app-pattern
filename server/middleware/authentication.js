const jwt = require("jsonwebtoken");
const { unauthorized } = require("../constants/statusCodes");
const logger = require("./winston");
const serectKey = process.env.JWT_SERECT_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers("authorization"); // format: 'Bearer <token>'
  if (!token) {
    return res.status(unauthorized).send("Access denied. No provided token");
  }

  try {
    const decoded = jwt.verify(token, serectKey);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(err);
    return res.status(400).send("Invalid Token");
  }
};

module.exports = verifyToken;
