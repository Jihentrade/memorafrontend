var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const corsMiddleware = require("./src/middlewares/cors");
var app = express();
const cron = require("node-cron");

require("dotenv").config();
// view engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "pug");

app.use(logger("dev"));

// Middleware CORS - doit être avant les routes
app.use(corsMiddleware);

// Body parsers - doivent être avant les routes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//2-*******************************CONNECTE THE DATABASE*********************

connectDB();

//********************************Routes de base ************************
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/users", usersRouter);

//********************************Routes API ************************
const commandeRouter = require("./src/routers/commandeRouter");
const authRouter = require("./src/routers/authRouter");
const adminRouter = require("./src/routers/adminRouter");
const clientRouter = require("./src/routers/clientRouter");
const reductionRouter = require("./src/routers/ReductionRouter");
const diagnosticRouter = require("./src/routers/diagnosticRouter");

app.use("/admin", adminRouter);
app.use("/commande", commandeRouter);
app.use("/client", clientRouter);
app.use("/reduction", reductionRouter);
app.use("/auth", authRouter);
app.use("/diagnostic", diagnosticRouter);
//**************************************************************************** */

// Export de l'application (le serveur sera démarré par server.js ou bin/www)
module.exports = app;
