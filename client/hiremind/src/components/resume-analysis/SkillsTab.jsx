import {
  Brain,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const SkillsTab = ({ resume }) => {
  const detectedSkills = Object.values(
    resume.skills || {}
  ).flat();

  const missingSkills = Object.values(
    resume.missingSkills || {}
  ).flat();

  const detectedSkillsCount =
    detectedSkills.length;

  const missingSkillsCount =
    missingSkills.length;

  const topSkills = missingSkills
    .slice(0, 3)
    .join(", ");

  return (
    <div className="space-y-8">

      {/* =========================
          AI SUMMARY
      ========================= */}

      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-violet-600
          via-purple-600
          to-indigo-600
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex items-start gap-4">

          {/* Icon */}

          <div
            className="
              rounded-2xl
              bg-white/20
              p-3
            "
          >
            <Brain size={28} />
          </div>

          {/* Content */}

          <div className="flex-1">

            <h2
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              AI Skill Summary
            </h2>

            <p
              className="
                mt-2
                text-purple-100
              "
            >
              {resume.summary}
            </p>

            {/* Counts */}

            <div className="mt-6 flex flex-wrap gap-8">

              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="text-green-300"
                />

                <span className="text-white">
                  {detectedSkillsCount} Skills Detected
                </span>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle
                  className="text-yellow-300"
                />

                <span className="text-white">
                  {missingSkillsCount} Skills Missing
                </span>
              </div>

            </div>

            {/* HireMind Insight */}

            <div
              className="
                mt-6
                rounded-xl
                bg-white/10
                p-4
              "
            >
              <p
                className="
                  text-sm
                  text-purple-100
                "
              >
                <span className="font-semibold text-white">
                  HireMind Insight:
                </span>{" "}
                Focus on{" "}
                <span className="font-semibold text-white">
                  {topSkills ||
                    "the missing skills"}
                </span>{" "}
                to strengthen your resume and
                increase your ATS compatibility.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* =========================
          SKILLS SECTION
      ========================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* =========================
            DETECTED SKILLS
        ========================= */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm

            dark:border-slate-700
            dark:bg-slate-900
          "
        >

          <h3
            className="
              mb-6
              text-xl
              font-bold
              text-slate-800

              dark:text-white
            "
          >
            Detected Skills
          </h3>

          {Object.entries(
            resume.skills || {}
          ).map(([category, skills]) => (

            <div
              key={category}
              className="mb-6"
            >

              <h4
                className="
                  mb-3
                  text-lg
                  font-semibold
                  text-violet-600

                  dark:text-violet-400
                "
              >
                {category}
              </h4>

              <div className="flex flex-wrap gap-2">

                {skills.map((skill) => (

                  <span
                    key={skill}
                    className="
                      rounded-full
                      bg-violet-100
                      px-3
                      py-1
                      text-sm
                      font-medium
                      text-violet-700

                      dark:bg-violet-500/20
                      dark:text-violet-300
                    "
                  >
                    {skill}
                  </span>

                ))}

              </div>
            </div>

          ))}

        </div>

        {/* =========================
            MISSING SKILLS
        ========================= */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm

            dark:border-slate-700
            dark:bg-slate-900
          "
        >

          <h3
            className="
              mb-6
              text-xl
              font-bold
              text-slate-800

              dark:text-white
            "
          >
            Missing Skills
          </h3>

          {Object.entries(
            resume.missingSkills || {}
          ).map(([category, skills]) => (

            <div
              key={category}
              className="mb-6"
            >

              <h4
                className="
                  mb-3
                  text-lg
                  font-semibold
                  text-red-500

                  dark:text-red-400
                "
              >
                {category}
              </h4>

              <div className="flex flex-wrap gap-2">

                {skills.map((skill) => (

                  <span
                    key={skill}
                    className="
                      rounded-full
                      bg-red-100
                      px-3
                      py-1
                      text-sm
                      font-medium
                      text-red-600

                      dark:bg-red-500/15
                      dark:text-red-400
                    "
                  >
                    {skill}
                  </span>

                ))}

              </div>
            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default SkillsTab;