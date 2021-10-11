require("dotenv").config({ path: ".env" });

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const startupApplication = require("./startup/index");
const connectDB = require("./startup/db");
const customErrorHandler = require("./middlewares/customErrorHandler");
// connect db
connectDB();

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// capture and handle error
app.use(customErrorHandler);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// start server
startupApplication(app);
