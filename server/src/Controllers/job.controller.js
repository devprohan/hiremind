const Resume = require("../Models/resume.model.js")
const matchResumeWithJob = require("../utils/jobMatch.js")

const jobMatch = async (req, res) => {
    try {
        const { resumeId, jobDescription } = req.body

        if (!resumeId || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Resume Id and Job Description are required !!"
            })
        }

        const resume = await Resume.findOne({
            _id: resumeId,
            user: req.user._id
        })

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found !!"
            })
        }

        const result = await matchResumeWithJob(
            resume.analysis,
            resume.skills,
            jobDescription
        )

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    jobMatch
}