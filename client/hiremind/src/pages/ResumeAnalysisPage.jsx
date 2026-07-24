// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getResumeById } from "../services/resumeService";

// export default function ResumeAnalysisPage() {
//     const { id } = useParams();

//     const [resume, setResume] = useState(null);

//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchResume();
//     }, []);

//     const fetchResume = async () => {
//         try {
//             const data = await getResumeById(id);

//             setResume(data.resume);
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <h2>Loading...</h2>;
//     }

//     return (
//         <div className="p-8">

//             <h1 className="text-3xl font-bold">
//                 {resume.originalName}
//             </h1>

//         </div>
//     );
// }

export default function ResumeAnalysisPage() {
  return (
    <div className="p-10 text-4xl font-bold">
      Resume Analysis Working ✅
    </div>
  );
}