import { motion } from "framer-motion";

export default function ScoreBreakdown({ breakdown }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="
        rounded-2xl
        border border-gray-100
        bg-white
        p-8
        shadow-md

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* Heading */}

      <h2
        className="
          mb-8
          text-xl
          font-semibold
          text-gray-900

          dark:text-white
        "
      >
        Score Breakdown
      </h2>

      <div className="space-y-7">
        {breakdown.map((item) => (
          <div key={item.title}>

            {/* Label + Score */}

            <div className="mb-2 flex justify-between">
              <span
                className="
                  font-medium
                  text-gray-700

                  dark:text-slate-200
                "
              >
                {item.title}
              </span>

              <span
                className="
                  font-semibold
                  text-gray-800

                  dark:text-white
                "
              >
                {item.score}/100
              </span>
            </div>

            {/* Progress Bar */}

            <div
              className="
                h-3
                w-full
                overflow-hidden
                rounded-full
                bg-gray-200

                dark:bg-slate-700
              "
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${item.score}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="
                  h-3
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  to-violet-600
                "
              />
            </div>

          </div>
        ))}
      </div>
    </motion.div>
  );
}