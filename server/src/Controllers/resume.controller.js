const Resume = require("../Models/resume.model.js");
const extractTextFromPDF = require("../utils/pdfExtractor.js");
const analyzeResume = require("../Services/resumeAnalysis.service.js");
const cloudinary = require("../config/cloudinary.js");

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

    // Gemini Analysis
    const analysis = await analyzeResume(resumeText);

    // convert JSON string -> object
    const result = JSON.parse(analysis);

    // update resume
    // Save AI result
    resume.atsScore = result.atsScore;
    resume.analysis = result.summary;
    resume.skills = (result.skills || []).map((skill) =>
      typeof skill === "string" ? skill : skill.name,
    );
    resume.missingSkills = (result.missingSkills || []).map((skill) =>
      typeof skill === "string" ? skill : skill.name,
    );
    resume.strengths = result.strengths || [];
    resume.weaknesses = result.weaknesses || [];
    resume.suggestions = result.suggestions || [];
    resume.status = "Completed";

    await resume.save();

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
    resume.analysis = result.summary;
    resume.skills = result.skills || [];
    resume.missingSkills = result.missingSkills || [];
    resume.strengths = result.strengths || [];
    resume.weaknesses = result.weaknesses || [];
    resume.suggestions = result.suggestions || [];
    resume.status = "Completed";

    await resume.save();

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

module.exports = {
  uploadResume,
  getMyResumes,
  getResumeById,
  deleteResume,
  reanalyzeResume,
};
