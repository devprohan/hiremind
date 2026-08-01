import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const MatchScoreCard = ({ result }) => {
  const score = Math.min(
    100,
    Math.max(0, Number(result?.matchScore) || 0)
  );

  const [displayScore, setDisplayScore] = useState(0);

  // Animate number from 0 → score
  useEffect(() => {
    setDisplayScore(0);

    if (score === 0) return;

    let current = 0;

    const duration = 1200;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = score / steps;

    const interval = setInterval(() => {
      current += increment;

      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [score]);

  const getStatus = () => {
    if (score >= 80) {
      return {
        title: "Excellent Match",
        description:
          "Your resume strongly matches the requirements for this position.",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }

    if (score >= 60) {
      return {
        title: "Good Match",
        description:
          "Your resume matches many of the requirements for this position.",
        badge: "bg-blue-50 text-blue-700 border-blue-200",
      };
    }

    if (score >= 40) {
      return {
        title: "Average Match",
        description:
          "Your resume matches some requirements but has room for improvement.",
        badge: "bg-amber-50 text-amber-700 border-amber-200",
      };
    }

    return {
      title: "Low Match",
      description:
        "Your resume needs improvement to better match this position.",
      badge: "bg-red-50 text-red-700 border-red-200",
    };
  };

  const status = getStatus();

  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        relative overflow-hidden
        rounded-3xl
        border border-slate-200
        bg-white
        p-7
        shadow-sm
      "
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-100/50 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}

        <div className="flex items-center gap-3">
          <motion.div
            initial={{
              scale: 0,
              rotate: -90,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 180,
            }}
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-xl
              bg-violet-100
              text-violet-600
            "
          >
            <Target size={23} />
          </motion.div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Job Match Score
            </h2>

            <p className="text-sm text-slate-500">
              Resume compatibility with this job
            </p>
          </div>
        </div>

        {/* Main Content */}

        <div className="mt-8 flex flex-col items-center">

          {/* Animated Circle */}

          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
            className="relative h-48 w-48"
          >
            <svg
              viewBox="0 0 180 180"
              className="-rotate-90 h-full w-full"
            >
              {/* Background Circle */}

              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="#ede9fe"
                strokeWidth="13"
              />

              {/* Animated Progress Circle */}

              <motion.circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{
                  strokeDashoffset: circumference,
                }}
                animate={{
                  strokeDashoffset: progress,
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              />

              {/* Gradient */}

              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#6366f1"
                  />

                  <stop
                    offset="50%"
                    stopColor="#7c3aed"
                  />

                  <stop
                    offset="100%"
                    stopColor="#a855f7"
                  />
                </linearGradient>
              </defs>
            </svg>

            {/* Score */}

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.4,
                }}
              >
                <span className="text-5xl font-bold tracking-tight text-violet-600">
                  {displayScore}
                </span>

                <span className="text-2xl font-bold text-violet-500">
                  %
                </span>
              </motion.div>

              <span className="mt-1 text-sm font-medium text-slate-500">
                Match Score
              </span>
            </div>

            {/* Sparkle */}

           
          </motion.div>

          {/* Status */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.9,
            }}
            className={`
              mt-5
              flex items-center gap-2
              rounded-full border
              px-4 py-2
              text-sm font-semibold
              ${status.badge}
            `}
          >
            <TrendingUp size={16} />

            {status.title}
          </motion.div>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.05,
            }}
            className="
              mt-4
              max-w-lg
              text-center
              text-sm
              leading-6
              text-slate-500
            "
          >
            {status.description}
          </motion.p>

          {/* Bottom Progress */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.1,
            }}
            className="mt-6 w-full max-w-lg"
          >
            <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
              <span>Match Strength</span>

              <span className="font-semibold text-violet-600">
                {score}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-violet-100">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${score}%`,
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-500
                  via-violet-500
                  to-purple-500
                "
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchScoreCard;