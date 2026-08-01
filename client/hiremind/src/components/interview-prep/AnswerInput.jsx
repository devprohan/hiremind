import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

const AnswerInput = ({
  value,
  onChange,
  placeholder = "Write your answer here...",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-7"
    >
      <div className="mb-2 flex items-center gap-2">
        <MessageSquareText
          size={17}
          className="text-violet-600"
        />

        <label className="text-sm font-semibold text-slate-700">
          Your Answer
        </label>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder={placeholder}
        className="
          w-full
          resize-none
          rounded-2xl
          border border-slate-200
          bg-slate-50/50
          p-4
          text-slate-700
          outline-none
          transition-all
          duration-200
          placeholder:text-slate-400
          hover:border-slate-300
          focus:border-violet-500
          focus:bg-white
          focus:ring-4
          focus:ring-violet-100
        "
      />

      <div className="mt-2 flex justify-end">
        <span className="text-xs text-slate-400">
          {value?.length || 0} characters
        </span>
      </div>
    </motion.div>
  );
};

export default AnswerInput;