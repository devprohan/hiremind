import ResumeCard from "./ResumeCard";
import { useNavigate } from "react-router-dom";

export default function ResumeGrid({
  resumes,
  loading,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/dashboard/resume/${id}`);
  };

  // Loading
  if (loading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-lg font-semibold">
          Loading resumes...
        </h2>
      </div>
    );
  }

  // Empty State
  if (resumes.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <h2 className="text-2xl font-bold text-slate-700">
          No resumes found 📄
        </h2>

        <p className="mt-3 text-slate-500">
          Upload your first resume to start analyzing ATS scores.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
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