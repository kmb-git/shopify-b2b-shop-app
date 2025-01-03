var express = require("express");
var router = express.Router();
// import { fetchAllProducts } from "../services/shopifyService.js";
var shopifyService = require("../services/shopifyServices");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("index", { title: "B2B APP DASHBOARD" });
});
router.get("/rules/create", async (req, res) => {
  try {
    const products = await shopifyService.fetchAllProducts(); // Fetch products

    res.render("about", { title: "B2B APP DASHBOARD", products }); // Pass to template
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send("Error fetching products.");
  }
});

module.exports = router;
