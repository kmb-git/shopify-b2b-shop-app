const express = require("express");
const router = express.Router();
const Discount = require("../models/Discount"); // Import the model
const shopifyService = require("../services/shopifyServices");

// Route to display the list page
router.get("/list", async (req, res) => {
  try {
    // Fetch all discount data from the database
    const data = await Discount.find();
    const products = await shopifyService.fetchAllProducts();

    // Render the Pug template with the fetched data
    res.render("listData", { data, products });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data.");
  }
});

module.exports = router;
