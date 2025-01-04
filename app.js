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

// Import route handlers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var profileRouter = require("./routes/customProfileRoutes");
var profileViewRouter = require("./routes/customRoutes");
var discountRoutes = require("./routes/discountRoutes"); // Discount-specific routes
var listRouter = require("./routes/listRoutes"); // Handles list page rendering
var authRouter = require("./routes/auth"); // Authentication routes
var protectedRouter = require("./routes/protected"); // Other protected routes
var priceRouter = require("./routes/priceRules"); // Other protected routes
var cors = require("cors");

var app = express();
databaseConfig(); // Initialize database connection

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
// Session management configuration
app.use(
  session({
    secret: process.env.SECRET || "your-secret-key", // Use the secret key from environment variables
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // MongoDB connection string
    }),
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

//CDEEE
// Public routes (No authentication required)
app.use("/", authRouter); // Authentication routes

// Protected routes (Authentication required)

app.use("/shopify", priceRouter);
app.use("/home", ensureAuthenticated, indexRouter);
app.use("/customer", profileRouter);
app.use("/profile", profileViewRouter);
app.use("/users", ensureAuthenticated, usersRouter);
app.use("/discounts", discountRoutes); // Discount routes
app.use("/list", ensureAuthenticated, listRouter);
app.use("/", protectedRouter); // Other protected routes

// Handle 404 errors
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
