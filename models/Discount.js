const mongoose = require('mongoose');

// Define schema for the discount form data
const DiscountSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true, // Either product ID or variant ID
  },
  discountType: {
    type: String,
    enum: ['percentage', 'amount', 'fixed amount'], // Allowed values
    required: true,
  },
  discount: {
    type: Number, // Discount value
    required: true,
  },
  isVariant: {
    type: Boolean, // Whether it is a variant
    required: true,
  },
});

// Export the model
module.exports = mongoose.model('Discount', DiscountSchema);