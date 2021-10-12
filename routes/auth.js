const express = require("express");
const Router = express.Router();
const useExist = require("../middlewares/userExist");
const validateUser = require("../middlewares/validators/validateUser");

const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

Router.route("/register").post(validateUser, useExist, register);
Router.route("/login").post(login);
Router.route("/logout").post(logout);
Router.route("/forgotpassword").post(forgotPassword);
Router.route("/resetpassword/:resetToken").put(resetPassword);

//export the route
module.exports = Router;
