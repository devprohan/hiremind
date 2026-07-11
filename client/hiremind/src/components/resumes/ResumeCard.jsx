import {
  FileText,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

export default function ResumeCard({ resume,onView }) {
  const scoreColor = () => {
    if (resume.ats >= 90)
      return "text-emerald-600 bg-emerald-50 border-emerald-200";

    if (resume.ats >= 75)
      return "text-amber-500 bg-amber-50 border-amber-200";

    return "text-red-500 bg-red-50 border-red-200";
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Top */}
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <FileText className="text-violet-600" size={28} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {resume.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Uploaded {resume.uploaded}
            </p>

            <p className="text-sm text-slate-400">
              {resume.size}
            </p>
          </div>

        </div>

        <div
          className={`rounded-2xl border px-4 py-2 text-center ${scoreColor()}`}
        >
          <p className="text-3xl font-black">
            {resume.ats}
          </p>

          <p className="text-xs font-semibold">
            ATS Score
          </p>
        </div>

      </div>

      {/* Skills */}

      <div className="mt-6 flex flex-wrap gap-2">

        {resume.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700"
          >
            {skill}
          </span>
        ))}

      </div>

      {/* Bottom */}

      <div className="mt-6 flex items-center justify-between border-t pt-5">

        <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition hover:bg-slate-100" 
          onClick={() => onView(resume.id)}>
          <Eye size={16} />
          View
        </button>

        <button className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition hover:bg-slate-100">
          <Download size={16} />
          Download
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm text-red-500 transition hover:bg-red-50">
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}