const ai = require("../config/gemini.js");

const matchResumeWithJob = async (resumeAnalysis, skills, jobDescription) => {
    try {
        const prompt = `
You are an ATS and Career Expert.

Compare the following resume with the given job description.

Resume Analysis:
${resumeAnalysis}

Candidate Skills:
${skills.join(", ")}

Job Description:
${jobDescription}

Return ONLY valid JSON in this format:

{
    "matchScore": 0,
    "matchedSkills": [],
    "missingSkills": [],
    "suggestions": []
}

Rules:
- matchScore should be between 0-100.
- matchedSkills should contain only matched skills.
- missingSkills should contain required skills not present.
- suggestions should contain 4-6 actionable resume improvement suggestions.
Do not add markdown or explanation.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let text = response.text.trim();

        // Remove markdown
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        // Extract only JSON object
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Invalid JSON response from Gemini");
        }

        return JSON.parse(jsonMatch[0]);

    } catch (error) {
        console.log("Failed to match resume with job")
        console.error(error);
        throw error;
    }
}

module.exports = matchResumeWithJob;