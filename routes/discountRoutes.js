const express = require("express");
const discountController = require("../controller/discountController");

const router = express.Router();

// Route to save discount data
router.post("/save-discounts", discountController.saveDiscounts);

// Route to fetch all discount data
router.get("/get-discounts", discountController.getAllDiscounts);

// Route to edit discount by ID
router.put("/edit/:id", discountController.editDiscount);

// Route to delete discount by ID
router.delete("/delete/:id", discountController.deleteDiscount);

module.exports = router;