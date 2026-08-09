const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendWeeklyTipsEmail = async (
  email,
  fullName,
  recommendation,
  atsScore,
) => {
  const info = await transporter.sendMail({
    from: `"HireMind" <${process.env.EMAIL_USER}>`,
    to: email,

    subject: `Your Personalized HireMind Resume Insight 🚀`,

    text: `Hi ${fullName},

Here's your personalized resume insight from HireMind.

Your current ATS Score: ${atsScore}/100

💡 ${recommendation.title}

${recommendation.message}

🎯 Your action for this week:

${recommendation.action}

Keep improving your resume with HireMind!

Best regards,
HireMind Team`,
  });

  console.log("📧 EMAIL RESULT");
  console.log("To:", email);
  console.log("Message ID:", info.messageId);
  console.log("Accepted:", info.accepted);
  console.log("Rejected:", info.rejected);
  console.log("Response:", info.response);
  return info;
};

module.exports = {
  sendWeeklyTipsEmail,
};
