import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Calendar,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { getRecentResumes } from "../../services/profileService";

const RecentActivityCard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentResumes();
  }, []);

  const fetchRecentResumes = async () => {
    try {
      const res = await getRecentResumes();
      setResumes(res.recentResumes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-slate-300"></div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 rounded-xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Recent Activity
      </h2>

      {resumes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <FileText
            className="mx-auto mb-3 text-slate-400"
            size={40}
          />

          <p className="text-slate-500">
            No resumes uploaded yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <motion.div
              key={resume._id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-violet-100 p-3">
                  <FileText
                    size={22}
                    className="text-violet-600"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {resume.originalName}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={15} />

                    {new Date(
                      resume.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-violet-600">
                  {resume.atsScore}
                </div>

                <div
                  className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    resume.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {resume.status === "Completed" ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <LoaderCircle
                      size={14}
                      className="animate-spin"
                    />
                  )}

                  {resume.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentActivityCard;