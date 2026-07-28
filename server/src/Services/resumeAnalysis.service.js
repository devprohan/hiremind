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
- Categorize detected skills into meaningful professional groups.
- Identify important missing skills based on the candidate's profile and current industry expectations.
- Categorize missing skills in the same way.
- Generate actionable improvement suggestions.

Rules:
1. Return ONLY valid JSON.
2. Do not include markdown, explanations, comments, or code fences.
3. Create skill categories dynamically based on the candidate's profession.
4. Only include categories that contain at least one skill.
5. Do not duplicate skills across categories.
6. Use concise and meaningful category names.
7. Use standard industry category names whenever possible.
8. Every category value MUST be an array of strings.
9. Never use numeric keys such as "0", "1", "2", etc.
10. Never return skills as a flat numbered object.
11. If a profession is non-technical, create profession-specific categories instead of software categories.
12. Preserve the original skill names from the resume.

IMPORTANT:
If any key inside "skills" or "missingSkills" is numeric ("0", "1", etc.), your response is INVALID.

Examples of valid categories (examples only, do not force them):

Software Engineer:
{
  "Programming Languages": ["Java", "Python"],
  "Frontend": ["React", "HTML", "CSS"],
  "Backend": ["Node.js", "Express"],
  "Database": ["MongoDB"],
  "Cloud": ["AWS"]
}

Mechanical Engineer:
{
  "CAD Tools": ["AutoCAD", "SolidWorks"],
  "Manufacturing": ["Lean Manufacturing"],
  "Mechanical Design": ["Machine Design"],
  "Simulation": ["ANSYS"]
}

Doctor:
{
  "Clinical Skills": ["Patient Care", "Diagnosis"],
  "Medical Procedures": ["Surgery"],
  "Healthcare Software": ["Epic EMR"]
}

Accountant:
{
  "Accounting": ["GST", "Tally"],
  "Finance": ["Financial Analysis"],
  "ERP": ["SAP"]
}

Warehouse Manager:
{
  "Warehouse Operations": ["Inventory Management", "Picking"],
  "Supply Chain": ["Logistics", "Distribution"],
  "Safety": ["5S", "OSHA"]
}

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
  "skills": {},
  "missingSkills": {},
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
- Return 5-10 actionable suggestions ordered by priority.

Skills:
- Extract every important skill found in the resume.
- Group skills into meaningful professional categories.
- Categories must adapt to the candidate's profession.
- Every category value must be an array of strings.
- Do not create empty categories.
- Do not use numeric category names.

Missing Skills:
- Recommend only skills relevant to the candidate's career path.
- Group them into meaningful categories using the same structure as "skills".
- Every category value must be an array of strings.
- Do not create empty categories.
- Do not use numeric category names.
- Do not recommend unrelated technologies.

Resume:
${resumeText}
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
