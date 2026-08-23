import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ resume }) {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex items-center justify-between">

      {/* =========================
          LEFT CONTENT
      ========================= */}

      <div>
        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="
            mb-4
            flex
            cursor-pointer
            items-center
            gap-2
            text-gray-500
            transition
            hover:text-purple-600

            dark:text-slate-400
            dark:hover:text-violet-400
          "
        >
          <ArrowLeft size={18} />

          Back
        </button>

        {/* Resume Name */}

        <h1
          className="
            text-3xl
            font-bold
            text-gray-900

            dark:text-white
          "
        >
          {resume?.originalName || "Resume.pdf"}
        </h1>

        {/* Date */}

        <p
          className="
            mt-2
            text-gray-500

            dark:text-slate-400
          "
        >
          Analyzed on{" "}
          {resume?.createdAt
            ? new Date(
                resume.createdAt
              ).toLocaleDateString()
            : "--"}
        </p>
      </div>

      {/* =========================
          DOWNLOAD BUTTON
      ========================= */}

      <button
        className="
          flex
          cursor-pointer
          items-center
          gap-2
          rounded-xl
          bg-purple-600
          px-5
          py-3
          text-white
          shadow
          transition
          hover:bg-purple-700
        "
        onClick={() => {
          if (!resume?.resumeUrl) {
            alert("Resume file not available.");
            return;
          }

          window.open(
            resume.resumeUrl,
            "_blank"
          );
        }}
      >
        <Download size={18} />

        Download Resume
      </button>

    </div>
  );
}