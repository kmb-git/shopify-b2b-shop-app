const express = require("express");
const priceRoleController = require("./path-to-priceRoleController");

const router = express.Router();

// Define routes
router.post("/priceRoles", priceRoleController.createPriceRole);
router.get("/priceRoles", priceRoleController.getAllPriceRoles);
router.get("/priceRoles/:id", priceRoleController.getPriceRoleById);
router.put("/priceRoles/:id", priceRoleController.updatePriceRole);
router.delete("/priceRoles/:id", priceRoleController.deletePriceRole);

module.exports = router;
