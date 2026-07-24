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
      type: Number,
      required: true,
    },

    resumeText: {
      type: String,
      default: "",
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    analysis: {
      type: String,
      default: "",
    },

    skills: {
      type: Map,
      of: [String],
      default: {},
    },

    missingSkills: {
      type: Map,
      of: [String],
      default: {},
    },

    strengths: [
      {
        type: String,
      },
    ],

    weaknesses: [
      {
        type: String,
      },
    ],

    suggestions: [
      {
        type: String,
      },
    ],

    breakdown: {
      content: {
        type: Number,
        default: 0,
      },
      formatting: {
        type: Number,
        default: 0,
      },
      skills: {
        type: Number,
        default: 0,
      },
      keywords: {
        type: Number,
        default: 0,
      },
    },

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

module.exports = mongoose.model("Resume", resumeSchema);
