const express = require("express");
const router = express.Router();
const customProfileController = require("../controller/customProfileController");

router.post("/", customProfileController.createProfile);
router.get("/", customProfileController.getProfiles);
router.get("/:id", customProfileController.getProfileById);
router.put("/:id", customProfileController.updateProfile);
router.delete("/:id", customProfileController.deleteProfile);

module.exports = router;
// customController.js
