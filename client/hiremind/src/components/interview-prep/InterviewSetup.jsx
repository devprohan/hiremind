import { motion } from "framer-motion";
import {
  BrainCircuit,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

const InterviewSetup = ({
  jobRole,
  setJobRole,
  onGenerate,
  loading,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <BrainCircuit size={25} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            AI Mock Interview
          </h2>

          <p className="text-sm text-slate-500">
            Generate personalized questions from your latest resume
          </p>
        </div>
      </div>

      <div className="mt-8">
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <BriefcaseBusiness size={17} />

          Target Job Role
        </label>

        <input
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="e.g. MERN Stack Developer"
          className="
            w-full rounded-xl
            border border-slate-200
            bg-slate-50
            px-4 py-3.5
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-violet-500
            focus:bg-white
            focus:ring-4
            focus:ring-violet-100
          "
        />

        <p className="mt-2 text-xs text-slate-400">
          Questions will be personalized using your latest analyzed resume.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={loading || !jobRole.trim()}
        className="
          mt-7 flex w-full cursor-pointer
          items-center justify-center gap-2
          rounded-xl
          bg-gradient-to-r
          from-violet-600 to-indigo-600
          px-5 py-3.5
          font-semibold text-white
          shadow-sm
          transition
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <Sparkles size={18} />

        {loading
          ? "Generating Questions..."
          : "Generate Interview Questions"}
      </motion.button>
    </motion.div>
  );
};

export default InterviewSetup;