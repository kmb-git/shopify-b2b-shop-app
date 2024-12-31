const mongoose = require("mongoose");

// Define the ProductList Schema
const productListSchema = new mongoose.Schema(
  {
    reserve_id: {
      type: String,
      required: true, 
      trim: true, 
    },
    is_variant: {
      type: Boolean,
      required: true, 
    },
    is_collection: {
      type: Boolean,
      required: true, 
    },
    price_role_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "PriceRole", 
      required: true, 
    },
  },
  { timestamps: true } 
);

const ProductList = mongoose.model("ProductList", productListSchema);

module.exports = ProductList;