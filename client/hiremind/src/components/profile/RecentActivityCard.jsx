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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        className="
          rounded-3xl
          border border-slate-200
          bg-white
          p-6
          shadow-lg

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="animate-pulse space-y-4">

          <div
            className="
              h-6
              w-48
              rounded
              bg-slate-300
              dark:bg-slate-700
            "
          />

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-20
                rounded-xl
                bg-slate-200

                dark:bg-slate-800
              "
            />
          ))}

        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-3xl
        border border-slate-200
        bg-white
        p-6
        shadow-lg

        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      {/* =========================
          HEADER
      ========================= */}

      <h2
        className="
          mb-6
          text-2xl
          font-bold
          text-slate-800

          dark:text-white
        "
      >
        Recent Activity
      </h2>

      {/* =========================
          EMPTY STATE
      ========================= */}

      {resumes.length === 0 ? (
        <div
          className="
            rounded-xl
            border
            border-dashed
            border-slate-300
            p-8
            text-center

            dark:border-slate-600
            dark:bg-slate-800/50
          "
        >
          <FileText
            className="
              mx-auto
              mb-3
              text-slate-400

              dark:text-slate-500
            "
            size={40}
          />

          <p
            className="
              text-slate-500

              dark:text-slate-400
            "
          >
            No resumes uploaded yet.
          </p>
        </div>
      ) : (

        /* =========================
           RESUME LIST
        ========================= */

        <div className="space-y-4">

          {resumes.map((resume) => (
            <motion.div
              key={resume._id}
              whileHover={{
                scale: 1.01,
              }}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                p-4
                transition

                dark:border-slate-700
                dark:bg-slate-800/50
                dark:hover:bg-slate-800
              "
            >

              {/* =========================
                  LEFT
              ========================= */}

              <div className="flex min-w-0 items-center gap-4">

                <div
                  className="
                    shrink-0
                    rounded-xl
                    bg-violet-100
                    p-3

                    dark:bg-violet-500/15
                  "
                >
                  <FileText
                    size={22}
                    className="
                      text-violet-600
                      dark:text-violet-400
                    "
                  />
                </div>

                <div className="min-w-0">

                  <h3
                    className="
                      truncate
                      font-semibold
                      text-slate-800

                      dark:text-slate-100
                    "
                  >
                    {resume.originalName}
                  </h3>

                  <div
                    className="
                      mt-1
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    <Calendar size={15} />

                    {new Date(
                      resume.createdAt
                    ).toLocaleDateString()}
                  </div>

                </div>
              </div>

              {/* =========================
                  RIGHT
              ========================= */}

              <div className="ml-4 shrink-0 text-right">

                <div
                  className="
                    text-xl
                    font-bold
                    text-violet-600

                    dark:text-violet-400
                  "
                >
                  {resume.atsScore}
                </div>

                {/* Status */}

                <div
                  className={`
                    mt-2
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium

                    ${
                      resume.status === "Completed"
                        ? `
                          bg-green-100
                          text-green-700

                          dark:bg-green-500/15
                          dark:text-green-400
                        `
                        : `
                          bg-orange-100
                          text-orange-700

                          dark:bg-orange-500/15
                          dark:text-orange-400
                        `
                    }
                  `}
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