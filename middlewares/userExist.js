const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");

const useExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return next(
        new errorResponse("User already exists with this email", 400)
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = useExist;
