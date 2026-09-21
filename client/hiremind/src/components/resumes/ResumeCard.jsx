import {
  FileText,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function ResumeCard({
  resume,
  onView,
  onDelete,
}) {
  const skills = Array.isArray(resume?.skills)
    ? resume.skills
    : Object.values(resume?.skills || {}).flat();

  const scoreColor = () => {
    if (resume?.atsScore >= 90) {
      return `
        text-emerald-600
        bg-emerald-50
        border-emerald-200
        dark:text-emerald-400
        dark:bg-emerald-500/10
        dark:border-emerald-500/30
      `;
    }

    if (resume?.atsScore >= 75) {
      return `
        text-amber-500
        bg-amber-50
        border-amber-200
        dark:text-amber-400
        dark:bg-amber-500/10
        dark:border-amber-500/30
      `;
    }

    return `
      text-red-500
      bg-red-50
      border-red-200
      dark:text-red-400
      dark:bg-red-500/10
      dark:border-red-500/30
    `;
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${API_URL}/resume/download/${resume._id}`,
        {
          method: "GET",
          credentials: "include",
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
    <div>
    </div>
  );
}

export default ResumeCard;