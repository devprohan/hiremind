import { motion } from "framer-motion";
import {
  FileText,
  Trophy,
  BarChart3,
  Activity,
} from "lucide-react";

const ResumeStatsCard = ({ stats }) => {
  const cards = [
    {
      icon: FileText,
      label: "Total Resumes",
      value: stats.resumes,
    },
    {
      icon: Trophy,
      label: "Highest ATS",
      value: `${stats.highestATS}%`,
    },
    {
      icon: BarChart3,
      label: "Average ATS",
      value: `${stats.averageATS}%`,
    },
    {
      icon: Activity,
      label: "Analyses Done",
      value: stats.analyses,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Resume Statistics
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 p-5"
            >
              <Icon
                size={24}
                className="mb-3 text-violet-700"
              />

              <h3 className="text-3xl font-bold text-slate-800">
                {item.value}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ResumeStatsCard;