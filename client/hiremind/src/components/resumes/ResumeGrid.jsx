import ResumeCard from "./ResumeCard";
import { useNavigate } from "react-router-dom";

export default function ResumeGrid({
  resumes,
  loading,
  onDelete,
}) {
  const navigate = useNavigate();

  // =====================================================
  // VIEW RESUME
  // =====================================================

  const handleView = (id) => {
    navigate(`/dashboard/resume/${id}`);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          flex
          items-center
          justify-center
          py-10
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            text-slate-700

            dark:text-slate-900
          "
        >
          Loading resumes...
        </h2>
      </div>
    );
  }

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (resumes.length === 0) {
    return (
      <div
        className="
          rounded-3xl

          border
          border-dashed
          border-slate-300

          bg-white

          p-12

          text-center

          shadow-sm

          transition-colors
          duration-300

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-slate-700

            dark:text-slate-900
          "
        >
          No resumes found 📄
        </h2>

        <p
          className="
            mt-3
            text-slate-500

            dark:text-slate-500
          "
        >
          Upload your first resume to start analyzing
          ATS scores.
        </p>
      </div>
    );
  }

  // =====================================================
  // RESUME GRID
  // =====================================================

  return (
    <div
      className="
        grid
        gap-6

        lg:grid-cols-2
      "
    >
      {resumes.map((resume) => (
        <ResumeCard
          key={resume._id}
          resume={resume}
          onView={handleView}
          onDelete={onDelete}
        />
      ))}
      
    </div>
  );
}