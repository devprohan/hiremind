const Resume = require("../Models/resume.model");

const getDashboardStats = async (req, res) => {
    try {
        // Get all resumes of logged-in user
        const resumes = await Resume.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        // Total resumes
        const totalResumes = resumes.length;

        // Highest ATS Score
        const highestATS =
            totalResumes > 0
                ? Math.max(...resumes.map((resume) => resume.atsScore))
                : 0;

        // Average ATS Score
        const averageATS =
            totalResumes > 0
                ? Math.round(
                    resumes.reduce(
                        (sum, resume) => sum + resume.atsScore,
                        0
                    ) / totalResumes
                )
                : 0;

        // Completed Analysis
        const completedAnalysis = resumes.filter(
            (resume) => resume.status === "Completed"
        ).length;

        // Processing Analysis
        const processing = resumes.filter(
            (resume) => resume.status === "Processing"
        ).length;

        // Latest Resume
        const latestResume =
            totalResumes > 0
                ? {
                    _id: resumes[0]._id,
                    originalName: resumes[0].originalName,
                    atsScore: resumes[0].atsScore,
                    status: resumes[0].status,
                    createdAt: resumes[0].createdAt,
                }
                : null;

        return res.status(200).json({
            success: true,
            stats: {
                totalResumes,
                highestATS,
                averageATS,
                completedAnalysis,
                processing,
                latestResume,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getRecentResumes = async (req, res) => {
    try {
        const recentResumes = await Resume.find({
            user: req.user_id
        }).sort({ createdAt: -1 }).limit(5).select(
            "_id originalName atsScore status createdAt resumeUrl"
        );

        return res.status(200).json({
            success: true,
            recentResumes
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getSkillsAnalytics = async (req, res) => {
    try {
        const resumes = await Resume.find({
            user: req.user._id
        })

        const skills = [... new Set(resumes.flatMap((resume) => resume.skills))];

        const missingSkills = [
            ...new Set(resumes.flatMap((resume) => resume.missingSkills)),
        ];

        return res.status(200).json({
            success: true,
            topSkills: skills,
            missingSkills,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    getDashboardStats,
    getRecentResumes,
    getSkillsAnalytics
};