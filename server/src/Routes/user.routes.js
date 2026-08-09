const express = require("express");

const protect = require("../Middlewares/auth.middleware.js");
const { getCurrentUser, updateProfile ,getPreferences,
  updatePreferences,  deleteAccount,} = require("../Controllers/user.controller.js");

const router = express.Router();

router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);
router.get("/preferences", protect, getPreferences);

router.put("/preferences", protect, updatePreferences);

router.delete("/account", protect, deleteAccount);

module.exports = router;
