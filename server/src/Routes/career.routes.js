const express = require("express")
const router = express.Router()
const protect = require("../Middlewares/auth.middleware.js")
const {careerRoadmap} = require("../Controllers/career.controller.js")

router.post("/roadmap", protect, careerRoadmap)

module.exports = router;