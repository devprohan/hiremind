const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        resumeUrl: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
        fileSize: {
            type: String,
            required: true,
        },
        atsScore: {
            type: Number,
            default: 0,
        },
        analysis: {
            type: String,
            default: "",
        },
        skills: [
            {
                type: String,
            },
        ],
        missingSkills: [
            {
                type: String,
            },
        ],
        status: {
            type: String,
            enum: ["Uploaded", "Processing", "Completed"],
            default: "Uploaded",
        },
    },
    {
        timestamps: true,
    },
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
