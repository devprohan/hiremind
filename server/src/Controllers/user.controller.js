const User = require("../Models/user.model.js");

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

module.exports = {
    getCurrentUser,
    updateProfile
};
