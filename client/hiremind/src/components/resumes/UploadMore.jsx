import { Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploadMore() {
  const navigate = useNavigate();

  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-violet-300

        bg-gradient-to-r
        from-violet-50
        to-purple-50

        p-10
        text-center

        transition-colors
        duration-300

        dark:border-violet-500/40
        dark:from-violet-500/10
        dark:to-purple-500/10
      "
    >
      {/* ICON */}

      <div
        className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full

          bg-violet-100

          dark:bg-violet-500/20
        "
      >
        <Sparkles
          size={38}
          className="
            text-violet-600

            dark:text-violet-400
          "
        />
      </div>

      {/* HEADING */}

      <h2
        className="
          mt-6
          text-2xl
          font-bold
          text-slate-800

          dark:text-slate-900
        "
      >
        Upload Another Resume
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          mx-auto
          mt-3
          max-w-lg
          text-slate-500

          dark:text-slate-500
        "
      >
        Compare multiple resumes, improve your ATS score,
        and discover which version performs the best.
      </p>

      {/* BUTTON */}

      <button
        type="button"
        onClick={() =>
          navigate("/dashboard/upload-resume")
        }
        className="
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-2xl

          bg-violet-600

          px-6
          py-3

          font-semibold
          text-white

          shadow-lg

          transition-all
          duration-300

          hover:-translate-y-1
          hover:bg-violet-700
          hover:shadow-xl

          dark:bg-violet-600
          dark:hover:bg-violet-500
        "
      >
        <Upload size={18} />

        Upload Resume
      </button>
    </div>
  );
}