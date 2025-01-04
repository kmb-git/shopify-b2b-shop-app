const mongoose = require("mongoose");

const EMAIL_REGEX = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

// Define the Custom Profiles Schema
const customProfilesSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator(value) {
          return EMAIL_REGEX.test(value);
        },
        message: `Email must be valid!`,
      },
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    tax: {
      type: String,
      trim: true,
    },
    address1: {
      type: String,
      required: true,
      trim: true,
    },
    address2: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String, // Stores multi-line text content
      trim: true,
    },
    account_status: {
      type: String,
      enum: ["active", "inactive", "suspended"], // Allowed values
      default: "inactive", // Default status
    },
    shopifyId: {
      type: String,
      required: false,
    },
    agree_terms_of_service: {
      type: Boolean,
      required: true, // Mandatory field
      validate: {
        validator(value) {
          return value === true; // Must be true
        },
        message: `You must agree to the terms of service.`,
      },
    },
  },
  { timestamps: true }
);

// Create the Custom Profiles Model
const CustomProfile = mongoose.model("CustomerProfile", customProfilesSchema);

module.exports = CustomProfile;
