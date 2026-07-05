const express = require("express")
const router = express.Router()

const protect = require("../Middlewares/auth.middleware.js")

const { interviewQuestions, } = require("../Controllers/interview.controller.js")

router.post("/generate", protect, interviewQuestions)

module.exports = router;