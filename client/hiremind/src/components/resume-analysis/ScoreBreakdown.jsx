import { motion } from "framer-motion";

export default function ScoreBreakdown({ breakdown }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-8"
    >
      <h2 className="text-xl font-semibold mb-8">
        Score Breakdown
      </h2>

      <div className="space-y-7">
        {breakdown.map((item) => (
          <div key={item.title}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 font-medium">
                {item.title}
              </span>

              <span className="font-semibold text-gray-800">
                {item.score}/100
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1 }}
                className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-600"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}