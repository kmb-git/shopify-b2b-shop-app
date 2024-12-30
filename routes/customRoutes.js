const express = require("express");
const router = express.Router();
const customProfileController = require("../controller/customController");

// Route to view all profiles
router.get("/", customProfileController.getAllProfiles);

// Route to approve a profile
router.post("/:id/approve", customProfileController.approveProfile);

// Route to delete a profile
router.post("/:id/delete", customProfileController.deleteProfile);

module.exports = router;
