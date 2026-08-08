import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { getSkillsAnalytics } from "../../services/profileService";

export default function SkillGapCard() {
  const [missingSkills, setMissingSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);

      const response = await getSkillsAnalytics();

      console.log("Skills Analytics:", response);

      setMissingSkills(response?.missingSkills || []);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      setMissingSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const visibleSkills = showAll
    ? missingSkills
    : missingSkills.slice(0, 8);

  const remainingSkills = missingSkills.length - 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
            <Lightbulb
              size={22}
              className="text-violet-600"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Skill Gap Analysis
            </h2>

            <p className="text-sm text-slate-500">
              Skills recommended to improve your ATS score
            </p>
          </div>
        </div>

        {/* Count */}
        {!loading && missingSkills.length > 0 && (
          <div className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-600">
            {missingSkills.length} skills
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8 text-sm text-slate-500">
          <LoaderCircle
            size={20}
            className="mr-2 animate-spin"
          />
          Loading skills...
        </div>
      )}

      {/* No skills */}
      {!loading && missingSkills.length === 0 && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
          <CheckCircle2
            size={30}
            className="mx-auto mb-2 text-emerald-500"
          />

          <p className="font-semibold text-slate-700">
            No skill gaps yet
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Upload and analyze your resume to get skill recommendations.
          </p>
        </div>
      )}

      {/* Skills */}
      {!loading && missingSkills.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {visibleSkills.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
              >
                <AlertTriangle
                  size={15}
                  className="shrink-0 text-orange-500"
                />

                <span className="truncate text-sm font-medium text-slate-700">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Show More / Less */}
          {missingSkills.length > 8 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mx-auto mt-4 flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  +{remainingSkills} more skills
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}