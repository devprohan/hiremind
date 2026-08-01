const Resume = require("../Models/resume.model.js");
const matchResumeWithJob = require("../utils/jobMatch.js");

const jobMatch = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume Id and Job Description are required !!",
      });
    }

    // Find user's resume
    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume Not Found !!",
      });
    }

    // ===============================
    // FLATTEN SKILLS
    // ===============================

    let skills = [];

    if (resume.skills) {
      // Already an array
      if (Array.isArray(resume.skills)) {
        skills = resume.skills;
      }

      // Mongoose Map
      else if (resume.skills instanceof Map) {
        for (const values of resume.skills.values()) {
          if (Array.isArray(values)) {
            skills.push(...values);
          }
        }
      }

      // Normal JavaScript object
      else if (typeof resume.skills === "object") {
        Object.values(resume.skills).forEach((values) => {
          if (Array.isArray(values)) {
            skills.push(...values);
          }
        });
      }
    }

    // Remove duplicates
    skills = [...new Set(skills)];

    console.log("========== JOB MATCH ==========");
    console.log("Resume:", resume.originalName);
    console.log("Skills:", skills);
    console.log("===============================");

    // Gemini Job Match
    const result = await matchResumeWithJob(
      resume.analysis || "",
      skills,
      jobDescription
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Job Match Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  jobMatch,
};