require("dotenv").config({ path: ".env" });

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const startupApplication = require("./loaders/index");
const connectDB = require("./loaders/db");
const customErrorHandler = require("./middlewares/customErrorHandler");
// connect db
connectDB();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(helmet());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/home", require("./routes/home"));

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
