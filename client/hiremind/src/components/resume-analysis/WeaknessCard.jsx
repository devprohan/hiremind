import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WeaknessCard({ weaknesses }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-8"
    >
      <h2 className="text-xl font-semibold mb-6">
        Areas to Improve
      </h2>

      <div className="space-y-5">
        {weaknesses.map((item, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            <AlertCircle
              className="text-red-500 mt-1"
              size={20}
            />

            <p className="text-gray-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}