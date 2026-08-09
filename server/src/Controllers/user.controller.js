const User = require("../Models/user.model.js");
const Resume = require("../Models/resume.model.js");
const cloudinary = require("../config/cloudinary.js");
// get current user
const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update profile
const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      college,
      branch,
      graduationYear,
      cgpa,
      skills,
      bio,
      github,
      linkedin,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    // update provided fields
    if (fullName) user.fullName = fullName;
    if (college) user.college = college;
    if (branch) user.branch = branch;
    if (graduationYear) user.graduationYear = graduationYear;
    if (cgpa) user.cgpa = cgpa;
    if (skills) user.skills = skills;
    if (bio) user.bio = bio;
    if (github) user.github = github;
    if (linkedin) user.linkedin = linkedin;

    await user.save();

    res.status(200).json({
      success: true,
      message: "profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get preferences
const getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("preferences");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      preferences: user.preferences,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update preferences
const updatePreferences = async (req, res) => {
  try {
    const { emailNotifications, aiSuggestions, weeklyTips, darkMode } =
      req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

   if (emailNotifications !== undefined) {
  user.preferences.emailNotifications = emailNotifications;
}

if (aiSuggestions !== undefined) {
  user.preferences.aiSuggestions = aiSuggestions;
}

if (weeklyTips !== undefined) {
  user.preferences.weeklyTips = weeklyTips;
}

if (darkMode !== undefined) {
  user.preferences.darkMode = darkMode;
}
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      preferences: user.preferences,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all resumes belonging to the user
    const resumes = await Resume.find({
      user: userId,
    });

    // Delete resumes from Cloudinary
    for (const resume of resumes) {
      try {
        await cloudinary.uploader.destroy(resume.publicId, {
          resource_type: "raw",
        });
      } catch (cloudinaryError) {
        console.error(
          `Failed to delete Cloudinary file ${resume.publicId}:`,
          cloudinaryError.message
        );
      }
    }

    // Delete all resumes from MongoDB
    await Resume.deleteMany({
      user: userId,
    });

    // Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete Account Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
};
module.exports = {
  getCurrentUser,
  updateProfile,
  getPreferences,
  updatePreferences,
   deleteAccount,
};
