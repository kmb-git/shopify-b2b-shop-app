const mongoose = require("mongoose");

// Define the PriceRole Schema
const priceRoleSchema = new mongoose.Schema(
  {
    all_price: {
      type: Boolean,
      required: true, // Mandatory field
    },
    is_collection: {
      type: Boolean,
      required: true, // Mandatory field
    },
    name: {
      type: String,
      required: true, // Mandatory field
      trim: true, // Removes extra spaces
    },
    discount_type: {
      type: String,
      required: true, // Mandatory field
      trim: true, // Removes extra spaces
    },
    discount_value: {
      type: String,
      required: true, // Mandatory field
      trim: true, // Removes extra spaces
    },
    tag: {
      type: String,
      required: true, // Mandatory field
      trim: true, // Removes extra spaces
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the PriceRole Model
const PriceRole = mongoose.model("PriceRole", priceRoleSchema);

module.exports = PriceRole;