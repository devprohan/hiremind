import { motion } from "framer-motion";
import AnswerInput from "./AnswerInput";
import { ArrowLeft, ArrowRight, Send, MessageSquareText } from "lucide-react";

const QuestionCard = ({
  question,
  currentIndex,
  total,
  answer,
  onAnswerChange,
  onNext,
  onPrevious,
  onSubmit,
  submitting,
}) => {
  return (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <MessageSquareText size={21} />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
            Question {currentIndex + 1}
          </span>

          <h2 className="mt-2 text-xl font-semibold leading-8 text-slate-800">
            {question?.question || question}
          </h2>
        </div>
      </div>

      <AnswerInput value={answer} onChange={onAnswerChange} />

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="
            flex cursor-pointer items-center gap-2
            rounded-xl border border-slate-200
            px-5 py-3
            font-medium text-slate-600
            transition hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        {currentIndex === total - 1 ? (
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="
              flex cursor-pointer items-center gap-2
              rounded-xl bg-violet-600
              px-5 py-3
              font-semibold text-white
              transition hover:bg-violet-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Send size={18} />

            {submitting ? "Evaluating..." : "Submit Interview"}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="
              flex cursor-pointer items-center gap-2
              rounded-xl bg-violet-600
              px-5 py-3
              font-semibold text-white
              transition hover:bg-violet-700
            "
          >
            Next
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
