import { motion } from "framer-motion";
import {
  Target,
  BadgeCheck,
  Lightbulb,
  FolderTree,
} from "lucide-react";

const iconMap = {
  ats: Target,
  skills: BadgeCheck,
  missing: Lightbulb,
  categories: FolderTree,
};

const colorMap = {
  ats: {
    bg: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
    icon: "text-cyan-400",
  },
  skills: {
    bg: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
    icon: "text-emerald-400",
  },
  missing: {
    bg: "from-orange-500/20 to-yellow-500/20",
    border: "border-orange-500/30",
    icon: "text-orange-400",
  },
  categories: {
    bg: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
    icon: "text-violet-400",
  },
};

export default function StatsCard({
  type,
  title,
  value,
  subtitle,
}) {
  const Icon = iconMap[type];
  const colors = colorMap[type];
   console.log("StatsCard type:", type);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative overflow-hidden rounded-2xl border ${colors.border}
      bg-gradient-to-br ${colors.bg}
      backdrop-blur-xl p-6`}
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-white/5 blur-3xl" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`rounded-xl p-4 bg-black/20 ${colors.icon}`}
        >
          <Icon size={34} />
        </div>
      </div>
    </motion.div>
  );
}

