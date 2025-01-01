require("dotenv").config(); // Load environment variables from .env file
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const databaseConfig = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const ensureAuthenticated = require("./middleware/authMiddleware"); // Import authentication middleware

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var profileRouter = require("./routes/customProfileRoutes");
var profileViewRouter = require("./routes/customRoutes");
var discountRouter = require('./routes/discountRoutes');
var listRouter = require('./routes/listRoutes'); // Handles list page rendering
var authRouter = require("./routes/auth"); // Import the auth routes
var protectedRouter = require("./routes/protected"); // Import protected routes

var app = express();
databaseConfig();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session management configuration
app.use(
  session({
    secret: process.env.SECRET || "your-secret-key", // Use the secret key from environment variables
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Use MongoDB URI from environment variables
    }),
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

// Public routes
app.use("/", authRouter); // Authentication routes

// Protected routes (requires authentication)
app.use("/", ensureAuthenticated, indexRouter);
app.use("/customer", ensureAuthenticated, profileRouter);
app.use("/profile", ensureAuthenticated, profileViewRouter);
app.use("/users", ensureAuthenticated, usersRouter);
app.use("/discounts", ensureAuthenticated, discountRouter);
app.use("/list", ensureAuthenticated, listRouter);
app.use("/", ensureAuthenticated, protectedRouter); // Protected routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;