const express = require("express");
const bcrypt = require("bcryptjs"); // For password hashing
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model

// Render Signup Page
// router.get("/signup", (req, res) => {
//   res.render("signUp", { title: "Sign Up" });
// });

// Render Signin Page
router.get("/signin", (req, res) => {
  res.render("signIn", { title: "Sign In" });
});

// Handle Signup Form Submission
// router.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).render("signUp", {
//         title: "Sign Up",
//         error: "User already exists. Please sign in.",
//       });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save the user to the database
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     // Redirect to signin page
//     res.redirect("/signin");
//   } catch (error) {
//     console.error("Error during signup:", error.message);
//     res.status(500).render("signup", {
//       title: "Sign Up",
//       error: "An unexpected error occurred. Please try again later.",
//     });
//   }
// });

// Handle Signin Form Submission
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("signin", {
        title: "Sign In",
        error: "Invalid email or password.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render("signin", {
        title: "Sign In",
        error: "Invalid email or password.",
      });
    }

    // Save user session
    req.session.user = user;

    // Redirect to home page
    res.redirect("/home");
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).render("signin", {
      title: "Sign In",
      error: "An unexpected error occurred. Please try again later.",
    });
  }
});

// Handle Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err.message);
      return res.status(500).send("Failed to logout.");
    }
    res.redirect("/signin"); // Redirect to signin page after logout
  });
});

// Handle Signout
router.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during signout:", err.message);
    }
    res.redirect("/signin");
  });
});

module.exports = router;
