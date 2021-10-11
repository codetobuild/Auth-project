const express = require("express");
const Router = express.Router();
const { home } = require("../controllers/home");
const { protect } = require("../middlewares/auth");

Router.route("/").get(protect, home);

//export the route
module.exports = Router;
