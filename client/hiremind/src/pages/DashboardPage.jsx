import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FileText,
  Target,
  BarChart3,
  CheckCircle2,
  Clock3,
  CalendarDays,
  Sparkles,
  BadgeCheck,
  Lightbulb,
  LoaderCircle,
  RefreshCcw,
} from "lucide-react";

import {
  getDashboardStats,
  getRecentResumes,
  getSkillsAnalytics,
} from "../services/dashboardService";

const DashboardPage = () => {
  // =========================
  // STATE
  // =========================

  const [stats, setStats] = useState({});
  const [recentResumes, setRecentResumes] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsRes, recentRes, skillsRes] =
        await Promise.all([
          getDashboardStats(),
          getRecentResumes(),
          getSkillsAnalytics(),
        ]);

      console.log("STATS:", statsRes);
      console.log("RECENT:", recentRes);
      console.log("SKILLS:", skillsRes);

      setStats(statsRes?.stats || {});

      setRecentResumes(
        recentRes?.recentResumes || []
      );

      setTopSkills(
        skillsRes?.topSkills || []
      );

      setMissingSkills(
        skillsRes?.missingSkills || []
      );
    } catch (err) {
      console.error(
        "Dashboard Error:",
        err.response?.data || err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <div className="text-center">
          <LoaderCircle
            size={45}
            className="mx-auto animate-spin text-violet-600"
          />

          <p className="mt-4 font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-red-500">
            {error}
          </p>

          <button
            onClick={fetchDashboard}
            className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white"
          >
            <RefreshCcw size={17} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // STAT CARDS
  // =========================

  const statCards = [
    {
      title: "Total Resumes",
      value: stats?.totalResumes ?? 0,
      subtitle: "Uploaded resumes",
      icon: FileText,
      iconBox:
        "bg-violet-100 text-violet-600",
    },

    {
      title: "Highest ATS",
      value: stats?.highestATS ?? 0,
      subtitle: "Best ATS score",
      icon: Target,
      iconBox:
        "bg-emerald-100 text-emerald-600",
    },

    {
      title: "Average ATS",
      value: stats?.averageATS ?? 0,
      subtitle: "Average performance",
      icon: BarChart3,
      iconBox:
        "bg-blue-100 text-blue-600",
    },

    {
      title: "Completed",
      value: stats?.completedAnalysis ?? 0,
      subtitle: "Completed analyses",
      icon: CheckCircle2,
      iconBox:
        "bg-pink-100 text-pink-600",
    },
  ];

  // =========================
  // LATEST RESUME
  // =========================

  const latestResume =
    stats?.latestResume || null;

  const latestScore =
    latestResume?.atsScore ?? 0;

  // =========================
  // ATS CIRCLE
  // =========================

  const radius = 58;
  const circumference =
    2 * Math.PI * radius;

  const scoreOffset =
    circumference -
    (Math.min(
      100,
      Math.max(0, latestScore)
    ) /
      100) *
      circumference;

  // =========================
  // TREND
  // =========================

  const trendData = [...recentResumes]
    .reverse()
    .map((resume) => ({
      id: resume._id,

      score: resume.atsScore ?? 0,

      date: resume.createdAt
        ? new Date(
            resume.createdAt
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "",
    }));

  return (
    <div className="min-h-screen bg-[#fafaff] p-2 md:p-4">

      {/* ===================================
          HEADER
      =================================== */}

      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Track your resume performance and improve
            your chances of getting hired.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
          <CalendarDays size={17} />

          {new Date().toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          )}
        </div>
      </section>

      {/* ===================================
          STAT CARDS
      =================================== */}

      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -5,
              }}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(80,70,140,0.06)]"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBox}`}
              >
                <Icon size={23} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-1 text-4xl font-black text-slate-900">
                {card.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {card.subtitle}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* ===================================
          MAIN ANALYTICS
      =================================== */}

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1fr]">

        {/* ===================================
            ATS TREND
        =================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(80,70,140,0.06)]"
        >
          <div>
            <h2 className="text-xl font-black text-slate-900">
              ATS Score Trend
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Performance of your recent resumes
            </p>
          </div>

          {trendData.length > 0 ? (
            <div className="mt-8 flex h-[270px] items-end gap-4 overflow-x-auto px-2">
              {trendData.map(
                (item, index) => {
                  const height = Math.max(
                    10,
                    Math.min(
                      100,
                      item.score
                    )
                  );

                  return (
                    <div
                      key={
                        item.id || index
                      }
                      className="flex min-w-[70px] flex-1 flex-col items-center justify-end"
                    >
                      <p className="mb-2 text-sm font-bold text-violet-600">
                        {item.score}
                      </p>

                      <motion.div
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: `${height * 1.8}px`,
                        }}
                        transition={{
                          duration: 0.8,
                          delay:
                            index * 0.08,
                        }}
                        className="w-10 rounded-t-xl bg-gradient-to-t from-violet-600 to-purple-400"
                      />

                      <p className="mt-3 text-xs font-medium text-slate-400">
                        {item.date}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div className="flex h-[270px] items-center justify-center">
              <div className="text-center">
                <BarChart3
                  size={38}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm text-slate-400">
                  No ATS history available.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-violet-50 p-5">
            <Sparkles
              size={20}
              className="mt-0.5 shrink-0 text-violet-600"
            />

            <div>
              <p className="font-bold text-violet-700">
                Performance Insight
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Analyze multiple versions of your
                resume to track how your ATS score
                improves over time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ===================================
            LATEST ANALYSIS
        =================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(80,70,140,0.06)]"
        >
          <h2 className="text-xl font-black text-slate-900">
            Latest Resume Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your most recently analyzed resume
          </p>

          {latestResume ? (
            <>
              {/* FILE */}

              <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                    <FileText size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-800">
                      {latestResume.originalName ||
                        "Resume"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {latestResume.createdAt
                        ? new Date(
                            latestResume.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* SCORE CIRCLE */}

              <div className="mt-8 flex justify-center">
                <div className="relative h-44 w-44">
                  <svg
                    viewBox="0 0 144 144"
                    className="h-full w-full -rotate-90"
                  >
                    <circle
                      cx="72"
                      cy="72"
                      r={radius}
                      fill="none"
                      stroke="#ede9fe"
                      strokeWidth="11"
                    />

                    <motion.circle
                      cx="72"
                      cy="72"
                      r={radius}
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="11"
                      strokeLinecap="round"
                      strokeDasharray={
                        circumference
                      }
                      initial={{
                        strokeDashoffset:
                          circumference,
                      }}
                      animate={{
                        strokeDashoffset:
                          scoreOffset,
                      }}
                      transition={{
                        duration: 1.2,
                      }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-violet-600">
                      {latestScore}
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                      ATS Score
                    </span>
                  </div>
                </div>
              </div>

              {/* STATUS */}

              <div className="mt-5 flex justify-center">
                {latestResume.status ===
                "Completed" ? (
                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
                    <CheckCircle2
                      size={17}
                    />
                    Completed
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
                    <Clock3 size={17} />
                    {latestResume.status ||
                      "Processing"}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-[300px] items-center justify-center">
              <div className="text-center">
                <FileText
                  size={42}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm text-slate-400">
                  No resume analyzed yet.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ===================================
          SKILLS
      =================================== */}

      <section className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* FOUND SKILLS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(80,70,140,0.06)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <BadgeCheck size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Skills Found
              </h2>

              <p className="text-sm text-slate-400">
                Detected across your resumes
              </p>
            </div>
          </div>

          {topSkills.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {topSkills.map(
                (skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          ) : (
            <p className="mt-8 text-sm text-slate-400">
              No skills detected yet.
            </p>
          )}
        </motion.div>

        {/* MISSING SKILLS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(80,70,140,0.06)]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Lightbulb size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">
                Recommended Skills
              </h2>

              <p className="text-sm text-slate-400">
                Skills you can consider adding
              </p>
            </div>
          </div>

          {missingSkills.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {missingSkills.map(
                (skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          ) : (
            <p className="mt-8 text-sm text-slate-400">
              No recommended skills available.
            </p>
          )}
        </motion.div>
      </section>

      {/* ===================================
          RECENT RESUMES
      =================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mt-6 rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(80,70,140,0.06)]"
      >
        <div>
          <h2 className="text-xl font-black text-slate-900">
            Recent Resumes
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest resume analyses
          </p>
        </div>

        {recentResumes.length > 0 ? (
          <div className="mt-5 divide-y divide-slate-100">
            {recentResumes.map(
              (resume) => (
                <div
                  key={resume._id}
                  className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <FileText
                        size={20}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-slate-800">
                        {resume.originalName ||
                          "Resume"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {resume.createdAt
                          ? new Date(
                              resume.createdAt
                            ).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-7">
                    <div>
                      <p className="text-xs text-slate-400">
                        Status
                      </p>

                      <p
                        className={`mt-1 text-sm font-bold ${
                          resume.status ===
                          "Completed"
                            ? "text-emerald-600"
                            : "text-orange-500"
                        }`}
                      >
                        {resume.status ||
                          "Processing"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-violet-600">
                        {resume.atsScore ??
                          0}
                      </p>

                      <p className="text-xs text-slate-400">
                        ATS Score
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="py-12 text-center">
            <FileText
              size={40}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm text-slate-400">
              No resumes uploaded yet.
            </p>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default DashboardPage;