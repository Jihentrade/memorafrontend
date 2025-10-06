var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const corsMiddleware = require("./src/middlewares/cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var app = express();
const cron = require("node-cron");

require("dotenv").config();
// view engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(express.json({ limit: "10mb" }));

app.use(express.json());

// Middleware CORS amélioré
app.use(corsMiddleware);

//2-*******************************CONNECTE THE DATABASE*********************

connectDB();
//********************************Tester les fonction ************************

const commandeRouter = require("./src/routers/commandeRouter");
const authRouter = require("./src/routers/authRouter");
const adminRouter = require("./src/routers/adminRouter");
const clientRouter = require("./src/routers/clientRouter");
const reductionRouter = require("./src/routers/ReductionRouter");
app.use("/admin", adminRouter);
app.use("/commande", commandeRouter);
app.use("/client", clientRouter);
app.use("/reduction", reductionRouter);
app.use("/auth", authRouter);
//**************************************************************************** */

//1-START THE SERVER
// Vercel serverless - pas besoin de app.listen()
if (process.env.NODE_ENV !== "production") {
  app.listen(4001, function () {
    console.log("Running on http://127.0.0.1:4001");
  });
}

module.exports = app;
