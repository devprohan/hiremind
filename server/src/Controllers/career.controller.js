const Resume = require("../Models/resume.model.js")
const generateCareerRoadmap = require("../utils/careerRoadmap.js")

const careerRoadmap = async (req, res) => {
    try {
        const { goal } = req.body

        if (!goal) {
            return res.status(400).json({
                success: false,
                message: "Career goal is required",
            });
        }

        const resume = await Resume.findOne({
            user: req.user._id
        }).sort({ createdAt: -1 });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        const roadMap = await generateCareerRoadmap(
            resume.analysis,
            resume.skills,
            resume.missingSkills,
            goal
        )

        return res.status(200).json({
            success: true,
            data: roadMap
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    careerRoadmap,
}