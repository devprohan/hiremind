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
      {/* Label */}

      <div className="mb-2 flex items-center gap-2">
        <MessageSquareText
          size={17}
          className="
            text-violet-600
            dark:text-violet-400
          "
        />

        <label
          className="
            text-sm
            font-semibold
            text-slate-700

            dark:text-slate-200
          "
        >
          Your Answer
        </label>
      </div>

      {/* Answer Input */}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder={placeholder}
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-slate-200
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

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-100
          dark:placeholder:text-slate-500

          dark:hover:border-slate-600

          dark:focus:border-violet-500
          dark:focus:bg-slate-800
          dark:focus:ring-violet-500/20
        "
      />

      {/* Character Count */}

      <div className="mt-2 flex justify-end">
        <span
          className="
            text-xs
            text-slate-400

            dark:text-slate-500
          "
        >
          {value?.length || 0} characters
        </span>
      </div>
    </motion.div>
  );
};

export default AnswerInput;