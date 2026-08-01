import { motion } from "framer-motion";
import {
  Trophy,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const InterviewResult = ({
  result,
  onRestart,
}) => {
  const score =
    Number(
      result?.score ??
      result?.overallScore
    ) || 0;

  const feedback =
    result?.feedback ||
    result?.overallFeedback ||
    "Interview completed successfully.";

  const strengths = result?.strengths || [];
  const improvements =
    result?.improvements ||
    result?.areasForImprovement ||
    [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Score */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
          <Trophy size={27} />
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Interview Score
        </p>

        <h2 className="mt-2 text-6xl font-bold text-violet-600">
          {score}
          <span className="text-3xl">%</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
          {feedback}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Strengths */}

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-600" />

            <h3 className="text-lg font-bold text-slate-800">
              Strengths
            </h3>
          </div>

          <div className="mt-5 space-y-3">
            {strengths.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-4 text-sm leading-6 text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Improvements */}

        <div className="rounded-3xl border border-orange-200 bg-orange-50/40 p-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-orange-500" />

            <h3 className="text-lg font-bold text-slate-800">
              Areas to Improve
            </h3>
          </div>

          <div className="mt-5 space-y-3">
            {improvements.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-4 text-sm leading-6 text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 font-semibold text-white transition hover:bg-violet-700"
      >
        <RotateCcw size={18} />
        Practice Again
      </button>
    </motion.div>
  );
};

export default InterviewResult;