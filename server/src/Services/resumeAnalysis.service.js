const ai = require("../config/gemini");

const analyzeResume = async (resumeText) => {
  try {
    const prompt = `
You are an ATS Resume Analyzer.

Analyze the resume below.

Return ONLY valid JSON.

{
  "atsScore": 0,
  "summary": "",
  "skills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text

    if (typeof text === "function") {
      text = text()
    }

    // Remove markdown
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    return text;
  }catch (error) {
  console.error("Gemini Error:", error);
  console.error("Message:", error.message);
  console.error("Stack:", error.stack);

  throw error;
  }
};

module.exports = analyzeResume;
