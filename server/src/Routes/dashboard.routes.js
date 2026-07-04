const express = require("express")
const router = express.Router()
const protect = require("../Middlewares/auth.middleware.js")

const { getDashboardStats, getRecentResumes, getSkillsAnalytics } = require("../Controllers/dashboard.controller.js")

router.get("/", protect, getDashboardStats)
router.get("/recent", protect, getRecentResumes)
router.get("/skills", protect, getSkillsAnalytics)


module.exports = router