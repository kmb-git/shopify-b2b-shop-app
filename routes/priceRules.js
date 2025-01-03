const express = require("express");
const priceRuleService = require("../services/shopifyServices"); // Adjust the path as per your project structure
const router = express.Router();

// Route to create a price rule and discount code
router.post("/create-price-rule", async (req, res) => {
  try {
    const params = req.body; // Expecting params in the request body
    const response = await priceRuleService.createPriceRule(params);

    if (response.error) {
      return res.status(500).json({ error: response.error });
    }

    res.status(200).json({
      message: "Price Rule and Discount Code created successfully!",
      data: response.data,
    });
  } catch (error) {
    console.error("Error in create-price-rule route:", error.message);
    res.status(500).json({
      error: "Failed to create Price Rule or Discount Code",
      details: error.message,
    });
  }
});

router.post("/create-fixed-price-rule", async (req, res) => {
  try {
    const params = req.body; // Expecting params in the request body
    const response = await priceRuleService.createFixedDiscountRule(params);

    if (response.error) {
      return res.status(500).json({ error: response.error });
    }

    res.status(200).json({
      message: "Price Rule and Discount Code created successfully!",
      data: response.data,
    });
  } catch (error) {
    console.error("Error in create-price-rule route:", error.message);
    res.status(500).json({
      error: "Failed to create Price Rule or Discount Code",
      details: error.message,
    });
  }
});
module.exports = router;
