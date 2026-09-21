const ai = require("../config/gemini");

const analyzeResume = async (resumeText) => {
  try {
    const prompt = `
You are an expert ATS Resume Analyzer and Technical Recruiter.

Analyze the resume carefully.

Evaluation Guidelines:
- Evaluate ATS compatibility out of 100.
- Identify strengths and weaknesses.
- Extract all technical and relevant professional skills.
- Categorize detected skills into meaningful professional groups.
- Identify important missing skills based on the candidate's profile and current industry expectations.
- Categorize missing skills in the same way.
- Generate actionable improvement suggestions.

Rules:
1. Create skill categories dynamically based on the candidate's profession.
2. Only include categories that contain at least one skill.
3. Do not duplicate skills across categories.
4. Use concise and meaningful category names.
5. Use standard industry category names whenever possible.
6. Every category value MUST be an array of strings.
7. Never use numeric keys such as "0", "1", "2".
8. Do not return skills as a flat numbered object.
9. Preserve original skill names from the resume.
10. Recommend only relevant missing skills.

Scoring:
- atsScore, content, formatting, skills and keywords must be integers between 0 and 100.
- Breakdown should be consistent with overall ATS score.

Summary:
- Write a concise professional summary in 2-3 sentences.

Strengths:
- Return 3-6 concise points.

Weaknesses:
- Return 3-6 concise points.

Suggestions:
- Return 5-10 actionable suggestions ordered by priority.

Resume:
${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            atsScore: {
              type: "integer"
            },

            breakdown: {
              type: "object",
              properties: {
                content: { type: "integer" },
                formatting: { type: "integer" },
                skills: { type: "integer" },
                keywords: { type: "integer" }
              },
              required: [
                "content",
                "formatting",
                "skills",
                "keywords"
              ]
            },

            summary: {
              type: "string"
            },

            skills: {
              type: "object",
              additionalProperties: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            },

            missingSkills: {
              type: "object",
              additionalProperties: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            },

            strengths: {
              type: "array",
              items: {
                type: "string"
              }
            },

            weaknesses: {
              type: "array",
              items: {
                type: "string"
              }
            },

            suggestions: {
              type: "array",
              items: {
                type: "string"
              }
            }
          },

          required: [
            "atsScore",
            "breakdown",
            "summary",
            "skills",
            "missingSkills",
            "strengths",
            "weaknesses",
            "suggestions"
          ]
        }
      }
    });

    const text = response.text;

    console.log("===== GEMINI RESPONSE =====");
    console.log(text);
    console.log("==========================");

    // Validate JSON
    const parsedResult = JSON.parse(text);

    return parsedResult;

  } catch (error) {

    console.error("Gemini Error:", error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    throw error;
  }
};

module.exports = analyzeResume;