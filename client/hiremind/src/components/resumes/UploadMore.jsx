import { Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UploadMore() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-dashed border-violet-300 bg-gradient-to-r from-violet-50 to-purple-50 p-10 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">

        <Sparkles
          size={38}
          className="text-violet-600"
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        Upload Another Resume
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-slate-500">
        Compare multiple resumes, improve your ATS score,
        and discover which version performs the best.
      </p>

      <button
        onClick={() => navigate("/dashboard/upload-resume")}
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-violet-700"
      >
        <Upload size={18} />
        Upload Resume
      </button>

    </div>
  );
}