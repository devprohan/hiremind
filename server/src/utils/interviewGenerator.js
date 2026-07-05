const ai = require("../config/gemini.js")

const generateInterviewQuestions = async (resumeAnalysis, skills, jobRole = "Software Developer") => {
    try {
        const prompt = `
You are an experienced technical interviewer.

Based on the candidate's resume and skills, generate interview questions.

Resume Analysis:
${resumeAnalysis}

Candidate Skills:
${skills.join(", ")}

Target Job Role:
${jobRole}

Return ONLY valid JSON in the following format:

{
  "technical": [],
  "behavioral": [],
  "hr": []
}

Rules:
- Generate exactly 10 technical questions.
- Generate exactly 5 behavioral questions.
- Generate exactly 5 HR questions.
- Questions should be suitable for a fresher.
- Return only JSON.
- Do not use markdown.
- Do not include explanations.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let text = response.text.trim()
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Invalid JSON response from Gemini")
        }

        return JSON.parse(jsonMatch[0])
    } catch (error) {
        console.error(error);
        throw error
    }
}

module.exports = generateInterviewQuestions;