var express = require("express");
var router = express.Router();
// import { fetchAllProducts } from "../services/shopifyService.js";
var shopifyService = require("../services/shopifyServices");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("index", { title: "B2B APP DASHBOARD", products: products });
});
router.get("/about", async function (req, res, next) {
  const products = await shopifyService.fetchAllProducts();
  res.render("about", { title: "B2B APP DASHBOARD", products: products });
});

module.exports = router;
