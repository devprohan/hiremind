const Resume = require("../Models/resume.model.js");
const User = require("../Models/user.model.js");
const { sendAnalysisEmail } = require("../utils/sendAnalysisEmail.js");
const extractTextFromPDF = require("../utils/pdfExtractor.js");
const analyzeResume = require("../Services/resumeAnalysis.service.js");
const cloudinary = require("../config/cloudinary.js");
const axios = require("axios");

// Upload Resume
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

    // Extract PDF text
    const resumeText = await extractTextFromPDF(resume.resumeUrl);
    resume.resumeText = resumeText;
    // Gemini Analysis
    const analysis = await analyzeResume(resumeText);

    // convert JSON string -> object
    let result;
    try {
      result = JSON.parse(analysis);
      console.log("========== GEMINI SKILLS ==========");
      console.dir(result.skills, { depth: null });
      console.log("========== GEMINI MISSING SKILLS ==========");
      console.dir(result.missingSkills, { depth: null });
    } catch (err) {
      throw new Error("Gemini returned invalid JSON");
    }
    console.log("========== GEMINI ==========");
    console.log(result);
    console.log("============================");
    // update resume
    // Save AI result
    resume.atsScore = result.atsScore;
    resume.breakdown = result.breakdown || {
      content: 0,
      formatting: 0,
      skills: 0,
      keywords: 0,
    };
    resume.analysis = result.summary;
    resume.skills =
      result.skills && typeof result.skills === "object" ? result.skills : {};

    resume.missingSkills =
      result.missingSkills && typeof result.missingSkills === "object"
        ? result.missingSkills
        : {};
    resume.strengths = result.strengths || [];
    resume.weaknesses = result.weaknesses || [];
    resume.suggestions = result.suggestions || [];
    resume.status = "Completed";

    await resume.save();

    const user = await User.findById(req.user._id);


if (user?.preferences?.emailNotifications === true) {
  try {
    await sendAnalysisEmail(
      user.email,
      user.fullName,
      resume.atsScore
    );
  } catch (emailError) {
    console.error(
      "Failed to send analysis email:",
      emailError.message
    );
  }
}

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

// Get All Resumes
const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Resume using Id
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "resume not found!",
      });
    }

    // Delete Resume From cloudinary
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    // Delete Resume From MongoDB
    await Resume.findByIdAndDelete(resume._id);

    return res.status(200).json({
      success: true,
      message: "resume deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reanalyze Resume
const reanalyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "resume not found",
      });
    }

    resume.status = "Processing";
    await resume.save();

    // Extract Text from resume
    const resumeText = await extractTextFromPDF(resume.resumeUrl);

    resume.resumeText = resumeText;

    // Analyze with Gemini
    const analysis = await analyzeResume(resume.resumeText);
    const result = JSON.parse(analysis);

    resume.atsScore = result.atsScore;
    resume.breakdown = result.breakdown || {
      content: 0,
      formatting: 0,
      skills: 0,
      keywords: 0,
    };

    resume.analysis = result.summary;
    resume.skills =
      result.skills && typeof result.skills === "object" ? result.skills : {};

    resume.missingSkills =
      result.missingSkills && typeof result.missingSkills === "object"
        ? result.missingSkills
        : {};
    resume.strengths = result.strengths || [];
    resume.weaknesses = result.weaknesses || [];
    resume.suggestions = result.suggestions || [];
    resume.status = "Completed";

    await resume.save();

    const user = await User.findById(req.user._id);

    if (user && user.preferences.emailNotifications) {
      try {
        await sendAnalysisEmail(user.email, user.fullName, resume.atsScore);
      } catch (emailError) {
        console.error("Failed to send analysis email:", emailError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Resume re-analyzed successfully",
      resume,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const response = await axios.get(resume.resumeUrl, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resume.originalName}"`,
    );

    res.setHeader("Content-Length", response.data.length);

    return res.send(response.data);
  } catch (error) {
    console.error("Download Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to download resume",
    });
  }
};

module.exports = {
  uploadResume,
  getMyResumes,
  getResumeById,
  deleteResume,
  reanalyzeResume,
  downloadResume,
};
