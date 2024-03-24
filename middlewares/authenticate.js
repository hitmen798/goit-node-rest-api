const jwt = require("jsonwebtoken");
require('dotenv').config()
const HTTPError = require("../helpers/HTTPError");

module.exports = (req, res, next) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  try {
    if (bearer === "Bearer" && token) {
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      res.locals.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401);
    throw HTTPError(401);
  }
};
