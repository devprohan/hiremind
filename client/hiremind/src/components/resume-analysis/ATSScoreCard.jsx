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
      className="bg-white rounded-2xl shadow p-8"
    >
      <h2 className="font-semibold text-lg mb-8">
        ATS Score
      </h2>

      <div className="flex justify-center">
        <div className="relative w-52 h-52">

          <svg className="w-full h-full rotate-[-90deg]">

            <circle
              cx="104"
              cy="104"
              r="85"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />

            <motion.circle
              cx="104"
              cy="104"
              r="85"
              stroke="#7C3AED"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={534}
              strokeDashoffset={534 - (534 * score) / 100}
              initial={{ strokeDashoffset: 534 }}
              animate={{
                strokeDashoffset: 534 - (534 * score) / 100,
              }}
              transition={{
                duration: 1.4,
              }}
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h1 className="text-5xl font-bold">
              {score}
            </h1>

            <p className="text-green-600 mt-2 font-medium">
              {getScoreLabel(score)}
            </p>

          </div>

        </div>
      </div>

      <p className="text-center text-gray-500 mt-8">
        {getMessage(score)}
      </p>
    </motion.div>
  );
}