const Resume = require("../Models/resume.model.js");

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please Upload a PDF resume",
            });
        }

        const resume = await Resume.create({
            user: req.user._id,
            resumeUrl: req.file.path,
            publicId: req.file.filename,
            originalName: req.file.originalname,
            fileSize: Number(req.file.size),
            status: "Uploaded",
        });

        return res.status(201).json({
            success: true,
            message: "Resume Uploaded Successfully",
            resume,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    uploadResume,
};
