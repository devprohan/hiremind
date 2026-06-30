const express = require("express");

const protect = require("../Middlewares/auth.middleware.js");
const { getCurrentUser, updateProfile } = require("../Controllers/user.controller.js");

const router = express.Router();

router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile)

module.exports = router;
