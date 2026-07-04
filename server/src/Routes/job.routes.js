const express = require("express")
const router = express.Router()

const { jobMatch } = require("../Controllers/job.controller.js")
const protect = require("../Middlewares/auth.middleware.js")

router.post("/match", protect, jobMatch)

module.exports = router
