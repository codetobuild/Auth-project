const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.home = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    return next(new errorResponse("Unauthorized to access this route", 401));
  }
};
