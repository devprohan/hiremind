const express = require("express");
const { registerUser, loginUser, changePassword, logoutUser } = require("../Controllers/auth.controller.js");
const protect = require("../Middlewares/auth.middleware.js")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.put("/change-password", protect, changePassword)
router.post("/logout", protect, logoutUser)

module.exports = router;
