import { motion } from "framer-motion";
import {
  Sparkles,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const RecommendationCard = ({ result }) => {
  const suggestions = result?.suggestions || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="
        overflow-hidden
        rounded-3xl
        border
        border-violet-200
        bg-gradient-to-br
        from-violet-50
        via-white
        to-indigo-50
        p-7
        shadow-sm

        dark:border-violet-500/20
        dark:from-violet-950/40
        dark:via-slate-900
        dark:to-indigo-950/30
      "
    >
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-start gap-3">

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-violet-600
            text-white
            shadow-sm
          "
        >
          <Sparkles size={21} />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-bold
              text-slate-800

              dark:text-slate-100
            "
          >
            AI Recommendations
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Personalized suggestions to improve your match
          </p>
        </div>

      </div>

      {/* =========================
          SUGGESTIONS
      ========================= */}

      {suggestions.length === 0 ? (
        <div
          className="
            mt-6
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5

            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <div className="flex items-center gap-2">

            <Lightbulb
              size={19}
              className="
                text-violet-600
                dark:text-violet-400
              "
            />

            <p
              className="
                font-medium
                text-slate-700

                dark:text-slate-200
              "
            >
              No recommendations available.
            </p>

          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">

          {suggestions.map((suggestion, index) => (
            <motion.div
              key={`${suggestion}-${index}`}
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.25 + index * 0.07,
              }}
              className="
                group
                flex
                items-start
                gap-4
                rounded-2xl
                border
                border-violet-100
                bg-white
                p-4
                transition

                hover:border-violet-200
                hover:shadow-sm

                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:border-violet-500/40
              "
            >

              {/* Number */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-violet-100
                  text-sm
                  font-bold
                  text-violet-600

                  dark:bg-violet-500/15
                  dark:text-violet-400
                "
              >
                {index + 1}
              </div>

              {/* Suggestion */}

              <p
                className="
                  flex-1
                  text-sm
                  leading-6
                  text-slate-600

                  dark:text-slate-300
                "
              >
                {suggestion}
              </p>

              {/* Arrow */}

              <ArrowRight
                size={17}
                className="
                  mt-1
                  shrink-0
                  text-slate-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-violet-500

                  dark:text-slate-600
                  dark:group-hover:text-violet-400
                "
              />

            </motion.div>
          ))}

        </div>
      )}

      {/* =========================
          FOOTER
      ========================= */}

      {suggestions.length > 0 && (
        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            text-xs
            text-violet-600

            dark:text-violet-400
          "
        >
          <Lightbulb size={15} />

          <span>
            Focus on the highest-priority improvements before applying.
          </span>
        </div>
      )}

    </motion.div>
  );
};

export default RecommendationCard;