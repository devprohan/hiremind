import { Brain, CheckCircle2, AlertTriangle } from "lucide-react";

const SkillsTab = ({ resume }) => {
  const detectedSkills = Object.values(resume.skills || {}).flat();
  const missingSkills = Object.values(resume.missingSkills || {}).flat();

  const detectedSkillsCount = detectedSkills.length;
  const missingSkillsCount = missingSkills.length;

  const topSkills = missingSkills.slice(0, 3).join(", ");

  return (
    <div className="space-y-8">
      {/* AI Summary */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 text-white shadow-xl">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-white/20 p-3">
            <Brain size={28} />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              AI Skill Summary
            </h2>

            <p className="mt-2 text-purple-100">
              {resume.summary}
            </p>

            <div className="mt-6 flex gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-300" />
                <span>{detectedSkillsCount} Skills Detected</span>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle className="text-yellow-300" />
                <span>{missingSkillsCount} Skills Missing</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white/10 p-4">
              <p className="text-sm text-purple-100">
                <span className="font-semibold text-white">
                  HireMind Insight:
                </span>{" "}
                Focus on{" "}
                <span className="font-semibold text-white">
                  {topSkills || "the missing skills"}
                </span>{" "}
                to strengthen your resume and increase your ATS compatibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Detected Skills */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-bold text-slate-800">
            Detected Skills
          </h3>

          {Object.entries(resume.skills || {}).map(([category, skills]) => (
            <div key={category} className="mb-6">
              <h4 className="mb-3 text-lg font-semibold text-violet-600">
                {category}
              </h4>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Missing Skills */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-xl font-bold text-slate-800">
            Missing Skills
          </h3>

          {Object.entries(resume.missingSkills || {}).map(
            ([category, skills]) => (
              <div key={category} className="mb-6">
                <h4 className="mb-3 text-lg font-semibold text-red-500">
                  {category}
                </h4>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;