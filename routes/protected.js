const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.render("protected", { title: "Protected Page", user: req.session.user });
});

module.exports = router;