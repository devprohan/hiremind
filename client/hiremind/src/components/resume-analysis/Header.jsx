import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ resume }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-purple-600 mb-4 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          {resume?.originalName || "Resume.pdf"}
        </h1>

        <p className="text-gray-500 mt-2">
          Analyzed on{" "}
          {resume?.createdAt
            ? new Date(resume.createdAt).toLocaleDateString()
            : "--"}
        </p>
      </div>

      <button
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl shadow transition"
        onClick={() => {
          if (!resume?.resumeUrl) {
            alert("Resume file not available.");
            return;
          }

          window.open(resume.resumeUrl, "_blank");
        }}
      >
        <Download size={18} />
        Download Resume
      </button>
    </div>
  );
}
