const ai = require("../config/gemini.js");

const generateInterviewQuestions = async (
  resumeAnalysis,
  skills,
  jobRole = "Software Developer"
) => {
  try {
    // Convert skills to array
    let flatSkills = [];

    if (Array.isArray(skills)) {
      flatSkills = skills;
    } else if (skills instanceof Map) {
      flatSkills = Array.from(skills.values()).flat();
    } else if (skills && typeof skills === "object") {
      flatSkills = Object.values(skills).flat();
    }

    flatSkills = [
      ...new Set(
        flatSkills
          .filter((skill) => typeof skill === "string")
          .map((skill) => skill.trim())
          .filter(Boolean)
      ),
    ];

    // IMPORTANT: this was missing
    const analysisText =
      typeof resumeAnalysis === "string"
        ? resumeAnalysis
        : JSON.stringify(resumeAnalysis || {}, null, 2);

    console.log("Job Role:", jobRole);
    console.log("Skills:", flatSkills);

    const prompt = `
You are an experienced technical interviewer.

TARGET JOB ROLE:
${jobRole}

Generate interview questions for the TARGET JOB ROLE.

IMPORTANT:
Technical questions must primarily test knowledge required for
"${jobRole}".

Do not generate technical questions merely because technologies
appear in the candidate's existing resume.

For example, if the target role is "Java Full Stack Developer",
focus on:
- Core Java
- OOP
- Collections
- Exception Handling
- Java 8+
- Spring
- Spring Boot
- REST APIs
- JPA
- Hibernate
- SQL
- Frontend fundamentals

Do NOT ask transition questions such as:
- "Given your JavaScript experience, how would you learn Java?"
- "Considering your MERN background..."
- "How would you move from Node.js to Spring Boot?"

Directly test the target technology instead.

Generate exactly 10 technical questions.

Technical questions should include:
- Fundamentals
- Conceptual questions
- Framework questions
- Practical questions
- Scenario/debugging questions
- Database/API questions where relevant

Questions should be suitable for a fresher/junior candidate.

--------------------------------------------------

For BEHAVIORAL questions, you MAY use the candidate's resume:

Resume Analysis:
${analysisText}

Candidate Skills:
${flatSkills.join(", ")}

Generate exactly 5 behavioral questions about:
- Projects
- Teamwork
- Problem solving
- Challenges
- Debugging
- Learning
- Collaboration

--------------------------------------------------

Generate exactly 5 HR questions appropriate for:

${jobRole}

Focus on:
- Career goals
- Motivation
- Strengths
- Weaknesses
- Adaptability
- Learning attitude

Return ONLY valid JSON:

{
  "technical": [],
  "behavioral": [],
  "hr": []
}

Rules:
- technical = exactly 10 questions
- behavioral = exactly 5 questions
- hr = exactly 5 questions
- Return JSON only
- No markdown
- No explanations
- No answers
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    text = text
      .trim()
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Invalid JSON response from Gemini");
    }

    const result = JSON.parse(jsonMatch[0]);

    if (
      !Array.isArray(result.technical) ||
      !Array.isArray(result.behavioral) ||
      !Array.isArray(result.hr)
    ) {
      throw new Error("Invalid interview response structure");
    }

    console.log("Interview generated successfully");
    console.log("Technical:", result.technical.length);
    console.log("Behavioral:", result.behavioral.length);
    console.log("HR:", result.hr.length);

    return result;

  } catch (error) {
    console.error("Interview Generator Error:", error);
    throw error;
  }
};

module.exports = generateInterviewQuestions;