const User = require("../Models/user.model.js");
const Resume = require("../Models/resume.model.js");

const generateWeeklyRecommendation = require(
  "../Services/weeklyRecommendation.service.js"
);

const { sendWeeklyTipsEmail } = require(
  "../utils/weeklyTipsEmail.js"
);

const sendWeeklyTips = async () => {
  try {
    console.log("Starting weekly resume tips job...");

    const users = await User.find({
      "preferences.weeklyTips": true,
    });

    console.log(`Found ${users.length} users subscribed to weekly tips.`);

    for (const user of users) {
      try {
        // Find user's latest completed resume
        const resume = await Resume.findOne({
          user: user._id,
          status: "Completed",
        }).sort({ updatedAt: -1 });

        // User hasn't completed a resume analysis yet
        if (!resume) {
          console.log(
            `Skipping ${user.email} - no completed resume analysis`
          );
          continue;
        }

        // Generate personalized recommendation using Gemini
        const recommendation =
          await generateWeeklyRecommendation(resume);

        // Send email
        await sendWeeklyTipsEmail(
          user.email,
          user.fullName,
          recommendation,
          resume.atsScore
        );

        console.log(
          `Weekly tip sent successfully to ${user.email}`
        );
      } catch (userError) {
        console.error(
          `Failed to send weekly tip to ${user.email}:`,
          userError.message
        );
      }
    }

    console.log("Weekly resume tips job completed.");
  } catch (error) {
    console.error(
      "Weekly resume tips job failed:",
      error.message
    );
  }
};

module.exports = sendWeeklyTips;