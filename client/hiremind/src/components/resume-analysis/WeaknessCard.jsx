import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WeaknessCard({ weaknesses }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
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
          mb-6
          text-xl
          font-semibold
          text-gray-900

          dark:text-white
        "
      >
        Areas to Improve
      </h2>

      {/* Weaknesses */}

      <div className="space-y-5">
        {weaknesses.map((item, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            <AlertCircle
              className="
                mt-1
                shrink-0
                text-red-500

                dark:text-red-400
              "
              size={20}
            />

            <p
              className="
                text-gray-700

                dark:text-slate-200
              "
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}