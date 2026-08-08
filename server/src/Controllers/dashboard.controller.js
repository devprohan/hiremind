const Resume = require("../Models/resume.model");



const getDashboardStats = async (req, res) => {
  try {
    // Get all resumes of logged-in user
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    const totalResumes = resumes.length;

   
    const highestATS =
      totalResumes > 0
        ? Math.max(...resumes.map((resume) => resume.atsScore || 0))
        : 0;

    const averageATS =
      totalResumes > 0
        ? Math.round(
            resumes.reduce(
              (sum, resume) => sum + (resume.atsScore || 0),
              0
            ) / totalResumes
          )
        : 0;

    
    const completedAnalysis = resumes.filter(
      (resume) => resume.status === "Completed"
    ).length;

    
    const processing = resumes.filter(
      (resume) => resume.status === "Processing"
    ).length;

  
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
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "_id originalName atsScore status createdAt resumeUrl"
      );

    return res.status(200).json({
      success: true,
      recentResumes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const getSkillsAnalytics = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    });

    const topSkills = [];
    const missingSkills = [];

  

    if (resumes.length === 0) {
      return res.status(200).json({
        success: true,
        topSkills: [],
        missingSkills: [],
      });
    }

   

    resumes.forEach((resume) => {

     

      if (resume.skills) {

        // If skills is a Map
        if (resume.skills instanceof Map) {
          for (const values of resume.skills.values()) {
            if (Array.isArray(values)) {
              topSkills.push(...values);
            }
          }
        }

       
        else if (Array.isArray(resume.skills)) {
          topSkills.push(...resume.skills);
        }
      }


    

      if (resume.missingSkills) {

        // If missingSkills is a Map
        if (resume.missingSkills instanceof Map) {
          for (const values of resume.missingSkills.values()) {
            if (Array.isArray(values)) {
              missingSkills.push(...values);
            }
          }
        }

        // If missingSkills is an Array
        else if (Array.isArray(resume.missingSkills)) {
          missingSkills.push(...resume.missingSkills);
        }
      }
    });


    

    const uniqueTopSkills = [
      ...new Set(topSkills),
    ];

    const uniqueMissingSkills = [
      ...new Set(missingSkills),
    ];


  

    return res.status(200).json({
      success: true,

      topSkills: uniqueTopSkills,

      missingSkills: uniqueMissingSkills,
    });

  } catch (error) {

    console.error(
      "Skills Analytics Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


 

module.exports = {
  getDashboardStats,
  getRecentResumes,
  getSkillsAnalytics,
};