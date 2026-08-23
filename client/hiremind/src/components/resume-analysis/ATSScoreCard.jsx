import { motion } from "framer-motion";

export default function ATSScoreCard({ score }) {
  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  const getMessage = (score) => {
    if (score >= 90)
      return "Your resume is highly ATS optimized.";

    if (score >= 75)
      return "Your resume is well optimized with a few improvements needed.";

    if (score >= 60)
      return "Your resume needs some optimization to improve ATS compatibility.";

    return "Your resume requires significant improvements for better ATS performance.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-8
        shadow

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* Heading */}

      <h2
        className="
          mb-8
          text-lg
          font-semibold
          text-slate-900

          dark:text-white
        "
      >
        ATS Score
      </h2>

      {/* Score Circle */}

      <div className="flex justify-center">
        <div className="relative h-52 w-52">

          <svg
            className="h-full w-full rotate-[-90deg]"
            viewBox="0 0 208 208"
          >
            {/* Background Circle */}

            <circle
              cx="104"
              cy="104"
              r="85"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="
                text-slate-200
                dark:text-slate-700
              "
            />

            {/* Score Circle */}

            <motion.circle
              cx="104"
              cy="104"
              r="85"
              stroke="#7C3AED"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={534}
              strokeDashoffset={
                534 - (534 * score) / 100
              }
              initial={{
                strokeDashoffset: 534,
              }}
              animate={{
                strokeDashoffset:
                  534 - (534 * score) / 100,
              }}
              transition={{
                duration: 1.4,
              }}
            />
          </svg>

          {/* Score */}

          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <h1
              className="
                text-5xl
                font-bold
                text-slate-900

                dark:text-white
              "
            >
              {score}
            </h1>

            <p
              className="
                mt-2
                font-medium
                text-green-600

                dark:text-green-400
              "
            >
              {getScoreLabel(score)}
            </p>
          </div>
        </div>
      </div>

      {/* Message */}

      <p
        className="
          mt-8
          text-center
          text-gray-500

          dark:text-slate-300
        "
      >
        {getMessage(score)}
      </p>
    </motion.div>
  );
}