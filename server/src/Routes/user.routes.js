const express = require("express");

const protect = require("../Middlewares/auth.middleware.js");
const { getCurrentUser } = require("../Controllers/user.controller.js");

const router = express.Router();

router.get("/me", protect, getCurrentUser);

module.exports = router;
