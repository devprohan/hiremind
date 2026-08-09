const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendAnalysisEmail = async (
  email,
  fullName,
  atsScore
) => {
  const info = await transporter.sendMail({
    from: `"HireMind" <${process.env.EMAIL_USER}>`,
    to: email,

    subject: "Your HireMind Resume Analysis is Ready 📊",

    text: `Hi ${fullName},

Your resume has been successfully analyzed by HireMind.

Your current ATS Score: ${atsScore}/100

Your complete resume analysis is now available on your HireMind dashboard.

You can review your:
- ATS Score
- Resume strengths
- Weaknesses
- Missing skills
- AI suggestions

Keep improving your resume with HireMind!

Best regards,
HireMind Team`,
  });

  console.log("📧 Resume analysis email sent");
  console.log("To:", email);
  console.log("Message ID:", info.messageId);

  return info;
};

module.exports = {
  sendAnalysisEmail,
};