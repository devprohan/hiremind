const { data } = require("react-router");
const Resume = require("../Models/resume.model.js")
const generateInterviewQuestions = require("../utils/interviewGenerator.js")

const interviewQuestions = async (req, res) => {
    try {
        const { jobRole } = req.body;

        const resume = await Resume.findOne({
            user: req.user._id,
        }).sort({ createdAt: -1 })

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        const result = await generateInterviewQuestions(
            resume.analysis,
            resume.skills,
            jobRole
        )

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    interviewQuestions,
}