import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Rocket,
  FileText,
} from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "ATS Master",
    description: "Achieved an ATS score above 90%.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Star,
    title: "Resume Optimizer",
    description: "Improved your resume using AI suggestions.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Rocket,
    title: "Career Explorer",
    description: "Completed more than 10 resume analyses.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileText,
    title: "First Upload",
    description: "Successfully uploaded your first resume.",
    color: "bg-green-100 text-green-600",
  },
];

const AchievementsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Achievements
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;

          return (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
              }}
              className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`rounded-xl p-3 ${achievement.color}`}
              >
                <Icon size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {achievement.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AchievementsCard;