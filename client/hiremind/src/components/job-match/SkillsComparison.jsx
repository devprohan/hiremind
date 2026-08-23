import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";

const SkillsComparison = ({ result }) => {
  const matchedSkills = result?.matchedSkills || [];
  const missingSkills = result?.missingSkills || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-7
        shadow-sm

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-7 flex items-center gap-3">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-violet-100

            dark:bg-violet-500/15
          "
        >
          <BadgeCheck
            size={22}
            className="
              text-violet-600
              dark:text-violet-400
            "
          />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-bold
              text-slate-800

              dark:text-slate-100
            "
          >
            Skills Comparison
          </h2>

          <p
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Skills matched against the job requirements
          </p>
        </div>
      </div>

      {/* =========================
          SKILLS GRID
      ========================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* =================================================
            MATCHED SKILLS
        ================================================= */}

        <div
          className="
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50/50
            p-5

            dark:border-emerald-500/25
            dark:bg-emerald-500/5
          "
        >

          {/* Header */}

          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={21}
                className="
                  text-emerald-600
                  dark:text-emerald-400
                "
              />

              <h3
                className="
                  font-semibold
                  text-slate-800

                  dark:text-slate-100
                "
              >
                Matched Skills
              </h3>

            </div>

            <span
              className="
                rounded-full
                bg-emerald-100
                px-3
                py-1
                text-xs
                font-bold
                text-emerald-700

                dark:bg-emerald-500/15
                dark:text-emerald-400
              "
            >
              {matchedSkills.length}
            </span>

          </div>

          {/* Empty */}

          {matchedSkills.length === 0 ? (
            <p
              className="
                text-sm
                text-slate-500

                dark:text-slate-400
              "
            >
              No matching skills detected.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">

              {matchedSkills.map((skill, index) => (
                <motion.span
                  key={`${skill}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-emerald-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-emerald-700

                    dark:border-emerald-500/25
                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                  "
                >
                  <CheckCircle2 size={14} />

                  {skill}
                </motion.span>
              ))}

            </div>
          )}

        </div>

        {/* =================================================
            MISSING SKILLS
        ================================================= */}

        <div
          className="
            rounded-2xl
            border
            border-orange-200
            bg-orange-50/50
            p-5

            dark:border-orange-500/25
            dark:bg-orange-500/5
          "
        >

          {/* Header */}

          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <AlertTriangle
                size={21}
                className="
                  text-orange-500
                  dark:text-orange-400
                "
              />

              <h3
                className="
                  font-semibold
                  text-slate-800

                  dark:text-slate-100
                "
              >
                Missing Skills
              </h3>

            </div>

            <span
              className="
                rounded-full
                bg-orange-100
                px-3
                py-1
                text-xs
                font-bold
                text-orange-700

                dark:bg-orange-500/15
                dark:text-orange-400
              "
            >
              {missingSkills.length}
            </span>

          </div>

          {/* No missing skills */}

          {missingSkills.length === 0 ? (
            <div>

              <p
                className="
                  font-medium
                  text-emerald-700

                  dark:text-emerald-400
                "
              >
                Great match!
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                No important missing skills were detected.
              </p>

            </div>
          ) : (

            /* Missing skills */

            <div className="flex flex-wrap gap-2">

              {missingSkills.map((skill, index) => (
                <motion.span
                  key={`${skill}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-orange-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-orange-700

                    dark:border-orange-500/25
                    dark:bg-orange-500/10
                    dark:text-orange-400
                  "
                >
                  <AlertTriangle size={14} />

                  {skill}
                </motion.span>
              ))}

            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
};

export default SkillsComparison;