const ai = require("../config/gemini.js")

const generateCareerRoadmap = async (
    resumeAnalysis,
    skills,
    missingSkills,
    goal
) => {
    try {
        const prompt = `
You are an experienced Career Mentor.

Create a personalized 6-month career roadmap.

Candidate Resume Analysis:
${resumeAnalysis}

Current Skills:
${skills.join(", ")}

Missing Skills:
${missingSkills.join(", ")}

Career Goal:
${goal}

Return ONLY valid JSON in this format:

{
    "roadmap":[
        {
            "phase":"",
            "topics":[],
            "projects":[]
        }
    ],
    "resources":[],
    "certifications":[]
}

Rules:
- Create exactly 6 phases (Month 1 to Month 6).
- Suggest practical topics.
- Give one project for every month.
- Suggest 5 learning resources.
- Suggest 3 certifications.
- Return only JSON.
- Do not use markdown.
- Do not include explanations.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        let text = response.text.trim();
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Invalid JSON response")
        }

        return JSON.parse(jsonMatch[0])
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = generateCareerRoadmap;