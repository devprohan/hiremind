import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function StrengthsCard({ strengths }) {
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
        Key Strengths
      </h2>

      {/* Strengths */}

      <div className="space-y-5">
        {strengths.map((item, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            <CheckCircle2
              className="
                mt-1
                shrink-0
                text-green-500

                dark:text-green-400
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