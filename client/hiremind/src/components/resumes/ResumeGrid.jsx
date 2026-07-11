import ResumeCard from "./ResumeCard";
import { useNavigate } from "react-router-dom";
// const resumes = [
//   {
//     id: 1,
//     name: "Resume_SDE.pdf",
//     ats: 92,
//     uploaded: "Today",
//     size: "245 KB",
//     skills: ["React", "Node.js", "MongoDB"],
//   },
//   {
//     id: 2,
//     name: "Frontend_Developer.pdf",
//     ats: 78,
//     uploaded: "Yesterday",
//     size: "198 KB",
//     skills: ["React", "JavaScript", "Tailwind"],
//   },
//   {
//     id: 3,
//     name: "Fullstack_Resume.pdf",
//     ats: 85,
//     uploaded: "2 days ago",
//     size: "280 KB",
//     skills: ["Java", "Spring Boot", "MySQL"],
//   },
//   {
//     id: 4,
//     name: "Software_Engineer.pdf",
//     ats: 71,
//     uploaded: "Last week",
//     size: "220 KB",
//     skills: ["C++", "DSA", "SQL"],
//   },
// ];

export default function ResumeGrid({resumes}) {
   const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/dashboard/resume/${id}`);
  };

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

if (loading) {
    return (
        <h2>Loading resumes...</h2>
    );
}

  return (
    <div className="grid gap-6 lg:grid-cols-2">
        <>
       
        </>
      {resumes?.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} 
        onView={handleView} />
      ))}
    </div>
  );
}