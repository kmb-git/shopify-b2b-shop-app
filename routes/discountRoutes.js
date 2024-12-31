const express = require('express');
const discountController = require('../controller/discountController');

const router = express.Router();

// Route to save discount data
router.post('/save-discounts', discountController.saveDiscounts);

// Route to fetch all discount data
router.get('/get-discounts', discountController.getAllDiscounts);

// Edit discount by ID
router.put('/edit/:id', discountController.editDiscount);

// Delete discount by ID
router.delete('/delete/:id', discountController.deleteDiscount);


module.exports = router;