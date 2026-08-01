const ai = require("../config/gemini.js");

const matchResumeWithJob = async (
  resumeAnalysis,
  skills,
  jobDescription
) => {
  try {
    // ==========================================
    // Convert skills into flat array
    // ==========================================

    let flatSkills = [];

    // Case 1: Already an array
    if (Array.isArray(skills)) {
      flatSkills = skills;
    }

    // Case 2: Mongoose Map
    else if (skills instanceof Map) {
      for (const values of skills.values()) {
        if (Array.isArray(values)) {
          flatSkills.push(...values);
        }
      }
    }

    // Case 3: Normal JavaScript object
    else if (skills && typeof skills === "object") {
      Object.values(skills).forEach((values) => {
        if (Array.isArray(values)) {
          flatSkills.push(...values);
        }
      });
    }

    // Remove duplicate skills
    flatSkills = [...new Set(flatSkills)];

    console.log("Job Match Skills:", flatSkills);

    // ==========================================
    // Gemini Prompt
    // ==========================================

    const prompt = `
You are an ATS and Career Expert.

Compare the following resume with the given job description.

Resume Analysis:
${resumeAnalysis || "No resume analysis available."}

Candidate Skills:
${flatSkills.length > 0 ? flatSkills.join(", ") : "No skills detected."}

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
- matchScore should be an integer between 0 and 100.
- matchedSkills should contain only skills from the job description that are present in the candidate's resume.
- missingSkills should contain important skills required by the job description that are not present in the candidate's resume.
- Do not put the same skill in both matchedSkills and missingSkills.
- Do not recommend unrelated technologies.
- suggestions should contain 4-6 actionable resume improvement suggestions.
- Base the match score on the resume analysis, candidate skills, and job description.
- Return only valid JSON.
- Do not add markdown, code blocks, or explanations outside the JSON.
`;

    // ==========================================
    // Gemini Request
    // ==========================================

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    // Safety if response.text is function
    if (typeof text === "function") {
      text = text();
    }

    text = text.trim();

    // Remove markdown if Gemini adds it
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Invalid JSON response from Gemini");
    }

    const result = JSON.parse(jsonMatch[0]);

    console.log("========== JOB MATCH RESULT ==========");
    console.log(result);
    console.log("======================================");

    return result;
  } catch (error) {
    console.log("Failed to match resume with job");
    console.error(error);

    throw error;
  }
};

module.exports = matchResumeWithJob;