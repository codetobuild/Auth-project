const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return next(new errorResponse("Unauthorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JSON_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new errorResponse("User not found", 404));
    }
    req.user = user;
    return next();
  } catch (err) {
    return next(new errorResponse("Unauthorized to access this route", 401));
  }
};
