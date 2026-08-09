import { FileText, Eye, Download, Trash2 } from "lucide-react";

export default function ResumeCard({ resume, onView, onDelete }) {
  const skills = Array.isArray(resume.skills)
    ? resume.skills
    : Object.values(resume.skills || {}).flat();

  const scoreColor = () => {
    if (resume.atsScore >= 90) {
      return "text-emerald-600 bg-emerald-50 border-emerald-200";
    }

    if (resume.atsScore >= 75) {
      return "text-amber-500 bg-amber-50 border-amber-200";
    }

    return "text-red-500 bg-red-50 border-red-200";
  };

 const handleDownload = async () => {
  try {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token || token === "null" || token === "undefined") {
      alert("Please login again");
      return;
    }

    const response = await fetch(
      `http://localhost:8080/api/resume/download/${resume._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Download response:", errorText);

      throw new Error(
        `Download failed: ${response.status} ${response.statusText}`
      );
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = resume.originalName || "resume.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);

  } catch (error) {
    console.error("Download Error:", error);
    alert(error.message || "Failed to download resume");
  }
};

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">

          <div className="rounded-xl bg-violet-100 p-3">
            <FileText
              className="text-violet-600"
              size={24}
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {resume.originalName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Uploaded{" "}
              {new Date(resume.createdAt).toLocaleDateString()}
            </p>

            <p className="text-sm text-slate-400">
              {resume.fileSize
                ? `${(resume.fileSize / 1024).toFixed(1)} KB`
                : "Unknown size"}
            </p>
          </div>

        </div>

        {/* ATS Score */}
        <div
          className={`rounded-2xl border px-4 py-2 text-center ${scoreColor()}`}
        >
          <p className="text-3xl font-black">
            {resume.atsScore ?? 0}
          </p>

          <p className="text-xs font-semibold">
            ATS Score
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {skills.slice(0, 5).map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700"
          >
            {skill}
          </span>
        ))}

        {skills.length > 5 && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            +{skills.length - 5} more
          </span>
        )}
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t pt-5">

        {/* View */}
        <button
          onClick={() => onView(resume._id)}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition hover:bg-slate-100"
        >
          <Eye size={16} />
          View
        </button>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition hover:bg-slate-100"
        >
          <Download size={16} />
          Download
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(resume._id)}
          className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>
    </div>
  );
}