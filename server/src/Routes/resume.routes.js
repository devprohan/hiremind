const express = require("express");

const router = express.Router();

const { uploadResume } = require("../Controllers/resume.controller.js");
const protect = require("../Middlewares/auth.middleware.js");
const upload = require("../Middlewares/upload.middleware.js");

router.post("/upload", protect, upload.single("resume"), uploadResume);

module.exports = router