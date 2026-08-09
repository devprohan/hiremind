const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateWeeklyRecommendation = async (resume) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
You are HireMind's personalized resume coach.

Analyze the following resume analysis data and create ONE personalized
weekly resume improvement recommendation.

Resume ATS Score:
${resume.atsScore}

Breakdown:
${JSON.stringify(resume.breakdown, null, 2)}

Strengths:
${JSON.stringify(resume.strengths, null, 2)}

Weaknesses:
${JSON.stringify(resume.weaknesses, null, 2)}

Suggestions:
${JSON.stringify(resume.suggestions, null, 2)}

Skills:
${JSON.stringify(resume.skills, null, 2)}

Missing Skills:
${JSON.stringify(resume.missingSkills, null, 2)}

Return ONLY a JSON object with exactly these fields:

{
  "title": "short recommendation title",
  "message": "personalized recommendation in 2-4 sentences",
  "action": "one specific action the user should take this week"
}

Rules:
- Base the recommendation ONLY on the provided resume analysis.
- Do not invent information about the user's resume.
- Focus on the most important weakness.
- Do not simply repeat the weakness.
- Make the recommendation practical and specific.
- Keep the message concise.
`;

  try {
    const result = await model.generateContent(prompt);

    const text = result.response.text().trim();

    console.log("========== WEEKLY GEMINI RESPONSE ==========");
    console.log(text);
    console.log("=============================================");

    const cleanedText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const recommendation = JSON.parse(cleanedText);

    if (
      !recommendation.title ||
      !recommendation.message ||
      !recommendation.action
    ) {
      throw new Error("Incomplete weekly recommendation");
    }

    return recommendation;
  } catch (error) {
    console.error(
      "Weekly Recommendation Error:",
      error.message
    );

    throw new Error(
      "Failed to generate weekly resume recommendation"
    );
  }
};

module.exports = generateWeeklyRecommendation;