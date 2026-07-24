const ai = require("../config/gemini");

const analyzeResume = async (resumeText) => {
  try {
    const prompt = `
You are an expert ATS Resume Analyzer and Technical Recruiter.

Analyze the resume carefully and return ONLY valid JSON.

Evaluation Guidelines:
- Evaluate ATS compatibility out of 100.
- Identify strengths and weaknesses.
- Extract all technical and relevant professional skills.
- Categorize detected skills into meaningful groups.
- Identify important missing skills based on the candidate's profile and current industry expectations.
- Categorize missing skills in the same way.
- Generate actionable improvement suggestions.

Rules:
1. Return ONLY valid JSON.
2. Do not include markdown or explanations.
3. Create skill categories dynamically.
4. Only include categories that contain at least one skill.
5. Do not duplicate skills across categories.
6. Use concise category names.
7. Use standard industry category names whenever possible.

Possible category examples (do not force these):
- Programming Languages
- Frontend
- Backend
- Database
- Cloud
- DevOps
- Testing
- Tools
- Authentication
- Mobile Development
- Machine Learning
- Data Science
- Data Engineering
- Cybersecurity
- UI/UX
- APIs
- Frameworks
- Libraries
- Soft Skills
- Others

Return the response in this exact JSON format:

{
  "atsScore": 0,
  "breakdown": {
    "content": 0,
    "formatting": 0,
    "skills": 0,
    "keywords": 0
  },
  "summary": "",
  "skills": {
  },
  "missingSkills": {
  },
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Scoring Rules:
- atsScore, content, formatting, skills and keywords must be integers between 0 and 100.
- The breakdown should be consistent with the overall ATS score.

Summary:
- Write a concise professional summary in 2-3 sentences.

Strengths:
- Return 3-6 concise bullet points.

Weaknesses:
- Return 3-6 concise bullet points.

Suggestions:
- Return 5-10 actionable suggestions ordered by importance.

Skills:
- Group detected skills into categories.
- Do not create empty categories.

Missing Skills:
- Group missing skills into categories.
- Recommend only skills relevant to the candidate's experience and career path.
- Do not recommend random technologies unrelated to the resume.

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
