import { motion } from "framer-motion";
import {
  Upload,
  FileSearch,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const activities = [
  {
    icon: Upload,
    title: "Resume Uploaded",
    description: "Successfully uploaded your latest resume.",
    time: "2 days ago",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzed",
    description: "AI analyzed your resume and generated insights.",
    time: "2 days ago",
  },
  {
    icon: TrendingUp,
    title: "ATS Score Improved",
    description: "Your ATS score increased from 78% to 92%.",
    time: "Yesterday",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions Applied",
    description: "Resume optimized using AI recommendations.",
    time: "Today",
  },
];

const RecentActivityCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Recent Activity
      </h2>

      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-violet-100 p-3">
                  <Icon size={18} className="text-violet-700" />
                </div>

                {index !== activities.length - 1 && (
                  <div className="mt-2 h-12 w-0.5 bg-violet-200" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RecentActivityCard;