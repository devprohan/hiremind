import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Trophy,
  BarChart3,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { getDashboardStats } from "../../services/profileService";

const ResumeStatsCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        className="
          rounded-3xl
          border border-slate-200
          bg-white
          p-6
          shadow-lg

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="animate-pulse space-y-4">

          <div
            className="
              h-6
              w-40
              rounded
              bg-slate-300

              dark:bg-slate-700
            "
          />

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="
                  h-28
                  rounded-2xl
                  bg-slate-200

                  dark:bg-slate-800
                "
              />
            ))}
          </div>

        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Resumes",
      value: stats?.totalResumes ?? 0,
      icon: FileText,
      color: `
        bg-blue-100
        text-blue-600

        dark:bg-blue-500/15
        dark:text-blue-400
      `,
    },
    {
      title: "Highest ATS",
      value: stats?.highestATS ?? 0,
      icon: Trophy,
      color: `
        bg-yellow-100
        text-yellow-600

        dark:bg-yellow-500/15
        dark:text-yellow-400
      `,
    },
    {
      title: "Average ATS",
      value: stats?.averageATS ?? 0,
      icon: BarChart3,
      color: `
        bg-violet-100
        text-violet-600

        dark:bg-violet-500/15
        dark:text-violet-400
      `,
    },
    {
      title: "Completed",
      value: stats?.completedAnalysis ?? 0,
      icon: CheckCircle2,
      color: `
        bg-green-100
        text-green-600

        dark:bg-green-500/15
        dark:text-green-400
      `,
    },
    {
      title: "Processing",
      value: stats?.processing ?? 0,
      icon: LoaderCircle,
      color: `
        bg-orange-100
        text-orange-600

        dark:bg-orange-500/15
        dark:text-orange-400
      `,
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-3xl
        border border-slate-200
        bg-white
        p-6
        shadow-lg

        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      {/* =========================
          HEADER
      ========================= */}

      <h2
        className="
          mb-6
          text-2xl
          font-bold
          text-slate-800

          dark:text-white
        "
      >
        Resume Statistics
      </h2>

      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                transition-all

                dark:border-slate-700
                dark:bg-slate-800/50
                dark:hover:bg-slate-800
              "
            >

              {/* Icon */}

              <div
                className={`
                  mb-4
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl

                  ${card.color}
                `}
              >
                <Icon
                  size={24}
                  className={
                    card.title === "Processing"
                      ? "animate-spin"
                      : ""
                  }
                />
              </div>

              {/* Label */}

              <p
                className="
                  text-sm
                  text-slate-500

                  dark:text-slate-400
                "
              >
                {card.title}
              </p>

              {/* Value */}

              <h3
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-slate-800

                  dark:text-white
                "
              >
                {card.value}
              </h3>

            </motion.div>
          );
        })}

      </div>
    </motion.div>
  );
};

export default ResumeStatsCard;