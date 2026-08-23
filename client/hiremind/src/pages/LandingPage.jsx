import { motion } from "framer-motion";

import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  FileSearch,
  FileText,
  Gauge,
  Search,
  Sparkles,
  Target,
  Upload,
  WandSparkles,
  Zap,
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// ======================================================
// DATA
// ======================================================

const features = [
  {
    icon: Gauge,
    title: "AI Resume Scoring",
    description:
      "Get an instant ATS score and understand how recruiters may evaluate your resume.",
    iconStyle:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
    glow:
      "group-hover:shadow-violet-200 dark:group-hover:shadow-violet-900/30",
  },

  {
    icon: Search,
    title: "Keyword Insights",
    description:
      "Discover important role-specific keywords that are missing from your resume.",
    iconStyle:
      "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
    glow:
      "group-hover:shadow-pink-200 dark:group-hover:shadow-pink-900/30",
  },

  {
    icon: WandSparkles,
    title: "Smart Suggestions",
    description:
      "Receive AI-powered suggestions to improve weak sections and strengthen your resume.",
    iconStyle:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    glow:
      "group-hover:shadow-blue-200 dark:group-hover:shadow-blue-900/30",
  },

  {
    icon: BriefcaseBusiness,
    title: "Job Match",
    description:
      "Compare your resume with a job description and identify matching and missing skills.",
    iconStyle:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    glow:
      "group-hover:shadow-emerald-200 dark:group-hover:shadow-emerald-900/30",
  },

  {
    icon: BrainCircuit,
    title: "Interview Prep",
    description:
      "Generate personalized technical, behavioral and HR questions for your target role.",
    iconStyle:
      "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
    glow:
      "group-hover:shadow-orange-200 dark:group-hover:shadow-orange-900/30",
  },
];

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload your resume and let HireMind understand your profile.",
  },

  {
    number: "02",
    icon: FileSearch,
    title: "AI Analysis",
    description:
      "Get ATS scoring, skill detection and personalized improvement insights.",
  },

  {
    number: "03",
    icon: Target,
    title: "Match Jobs",
    description:
      "Compare your resume against job descriptions and discover skill gaps.",
  },

  {
    number: "04",
    icon: BrainCircuit,
    title: "Prepare Interview",
    description:
      "Practice AI-generated interview questions tailored to your target role.",
  },
];

const containerAnimation = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
    },
  },
};

// ======================================================
// PAGE
// ======================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <Navbar />

      <main>

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="relative overflow-hidden">

          {/* Background */}

          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-violet-50/80 to-pink-50/80 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950/40" />

          <div className="absolute -left-40 top-10 -z-10 h-[450px] w-[450px] rounded-full bg-violet-300/20 blur-[120px] dark:bg-violet-700/20" />

          <div className="absolute -right-40 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-pink-300/20 blur-[130px] dark:bg-pink-700/20" />

          <div className="absolute left-1/2 top-[500px] -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-purple-300/10 blur-[120px] dark:bg-purple-700/10" />

          <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">

            {/* ==================================================
                LEFT CONTENT
            ================================================== */}

            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="visible"
            >

              {/* Badge */}

              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur-xl dark:border-violet-500/30 dark:bg-slate-900/70 dark:text-violet-300"
              >
                <Sparkles size={16} />

                AI-powered placement companion
              </motion.div>

              {/* Heading */}

              <motion.h1
                variants={fadeUp}
                className="mt-7 max-w-3xl text-5xl font-black leading-[1.07] tracking-tight text-slate-900 dark:text-white md:text-6xl xl:text-7xl"
              >
                Build a resume that{" "}

                <span className="relative">

                  <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    gets noticed.
                  </span>

                  <svg
                    className="absolute -bottom-3 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 9C75 2 200 2 298 7"
                      stroke="#c084fc"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>

                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300"
              >
                Analyze your resume with AI, improve your ATS
                score, discover skill gaps, match the right jobs
                and prepare confidently for interviews.
              </motion.p>

              {/* Buttons */}

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-4 sm:flex-row"
              >

                <a
                  href="/register"
                  className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-7 py-4 font-bold text-white shadow-xl shadow-violet-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-300 dark:shadow-violet-950/40"
                >
                  Analyze My Resume

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#how"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  See How It Works
                </a>

              </motion.div>

              {/* Trust */}

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-500 dark:text-slate-400"
              >

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />
                  Instant analysis
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />
                  ATS optimized
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />
                  AI powered
                </div>

              </motion.div>

            </motion.div>

            {/* ==================================================
                DASHBOARD PREVIEW
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                x: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="relative"
            >

              {/* Floating Resume Status */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -left-5 top-16 z-20 hidden items-center gap-3 rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 sm:flex"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Resume Status
                  </p>

                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    ATS Optimized
                  </p>
                </div>

              </motion.div>

              {/* Main Card */}

              <div className="relative rounded-[32px] border border-white/70 bg-white/75 p-3 shadow-[0_35px_80px_rgba(124,58,237,0.18)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/75">

                <div className="rounded-[26px] border border-violet-100 bg-white p-6 dark:border-violet-500/20 dark:bg-slate-900 md:p-8">

                  {/* Header */}

                  <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-slate-700">

                    <div>
                      <p className="font-black text-slate-800 dark:text-white">
                        Resume Analysis
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        software-engineer.pdf
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
                      <FileText size={20} />
                    </div>

                  </div>

                  {/* Score Cards */}

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">

                    {/* ATS */}

                    <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 p-6 dark:from-violet-950/40 dark:to-purple-950/40">

                      <div className="flex items-center justify-between">

                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          ATS Score
                        </p>

                        <Gauge
                          size={18}
                          className="text-violet-500"
                        />

                      </div>

                      <div className="mt-5 flex items-end gap-2">

                        <span className="text-6xl font-black text-violet-600 dark:text-violet-400">
                          86
                        </span>

                        <span className="mb-2 text-sm font-bold text-slate-400">
                          / 100
                        </span>

                      </div>

                      <div className="mt-5 h-2 overflow-hidden rounded-full bg-violet-100 dark:bg-violet-950">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: "86%",
                          }}
                          transition={{
                            duration: 1.4,
                            delay: 0.5,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-pink-500"
                        />

                      </div>

                      <p className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <Zap size={13} />
                        Excellent resume
                      </p>

                    </div>

                    {/* Job Match */}

                    <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 p-6 dark:from-pink-950/40 dark:to-rose-950/40">

                      <div className="flex items-center justify-between">

                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          Job Match
                        </p>

                        <Target
                          size={18}
                          className="text-pink-500"
                        />

                      </div>

                      <p className="mt-5 text-5xl font-black text-pink-500 dark:text-pink-400">
                        92%
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                        Strong Match
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">

                        <CheckCircle2
                          size={14}
                          className="text-emerald-500"
                        />

                        12 skills matched
                      </div>

                    </div>

                  </div>

                  {/* Skills */}

                  <div className="mt-6">

                    <div className="flex items-center justify-between">

                      <p className="font-bold text-slate-800 dark:text-white">
                        Top Skills
                      </p>

                      <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                        12 detected
                      </span>

                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">

                      {[
                        ["React", 94],
                        ["Node.js", 90],
                        ["JavaScript", 88],
                        ["MongoDB", 82],
                      ].map(([skill, score]) => (

                        <div
                          key={skill}
                          className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-700 dark:bg-slate-800/60"
                        >

                          <div className="flex items-center justify-between">

                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {skill}
                            </span>

                            <Check
                              size={15}
                              className="text-emerald-500"
                            />

                          </div>

                          <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">

                            <div
                              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-400"
                              style={{
                                width: `${score}%`,
                              }}
                            />

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

              {/* Floating Interview Card */}

              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                }}
                className="absolute -bottom-7 -right-4 hidden items-center gap-3 rounded-2xl border border-white bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90 sm:flex"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
                  <BrainCircuit size={20} />
                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Interview Prep
                  </p>

                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    20 Questions Ready
                  </p>

                </div>

              </motion.div>

            </motion.div>

          </div>

        </section>

        {/* ==================================================
            MINI STATS
        ================================================== */}

        <section className="border-y border-violet-100 bg-white dark:border-slate-800 dark:bg-slate-950">

          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-slate-100 px-6 dark:divide-slate-800 md:grid-cols-4 md:divide-y-0">

            {[
              ["AI", "Resume Analysis"],
              ["ATS", "Score Optimization"],
              ["Smart", "Job Matching"],
              ["Personalized", "Interview Prep"],
            ].map(([value, label]) => (

              <div
                key={label}
                className="px-4 py-8 text-center"
              >

                <p className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-2xl font-black text-transparent">
                  {value}
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {label}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* ==================================================
            FEATURES
        ================================================== */}

        <section
          id="features"
          className="relative mx-auto max-w-7xl px-6 py-28"
        >

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
              <Sparkles size={15} />
              Powerful Features
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">

              Everything you need to{" "}

              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                land the job
              </span>

            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
              One intelligent platform to analyze, improve,
              match and prepare.
            </p>

          </div>

          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5"
          >

            {features.map((feature) => {

              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                  }}
                  className={`group rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(80,70,140,0.06)] transition duration-300 hover:border-violet-100 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-500/30 ${feature.glow}`}
                >

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.iconStyle} transition duration-300 group-hover:scale-110`}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 text-lg font-black text-slate-800 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-sm font-bold text-violet-600 opacity-0 transition group-hover:opacity-100 dark:text-violet-400">
                    Learn more
                    <ArrowRight size={15} />
                  </div>

                </motion.div>
              );
            })}

          </motion.div>

        </section>

        {/* ==================================================
            HOW IT WORKS
        ================================================== */}

        <section
          id="how"
          className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-pink-50 py-28 dark:from-slate-900 dark:via-slate-950 dark:to-purple-950/40"
        >

          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-200/30 blur-[100px] dark:bg-violet-700/10" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-200/30 blur-[100px] dark:bg-pink-700/10" />

          <div className="relative mx-auto max-w-7xl px-6">

            <div className="mx-auto max-w-3xl text-center">

              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-violet-600 shadow-sm dark:bg-slate-800 dark:text-violet-400">
                Simple Process
              </span>

              <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">

                From resume to interview in{" "}

                <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                  four simple steps
                </span>

              </h2>

              <p className="mt-5 text-lg text-slate-500 dark:text-slate-400">
                HireMind guides you throughout your placement
                journey.
              </p>

            </div>

            <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              <div className="absolute left-[12%] right-[12%] top-14 hidden border-t-2 border-dashed border-violet-200 dark:border-violet-800 lg:block" />

              {steps.map((step, index) => {

                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="relative"
                  >

                    <div className="relative rounded-3xl border border-white bg-white/80 p-7 text-center shadow-[0_12px_35px_rgba(100,80,160,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80">

                      <span className="absolute right-5 top-4 text-5xl font-black text-violet-50 dark:text-violet-950">
                        {step.number}
                      </span>

                      <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 text-white shadow-lg shadow-violet-200 dark:shadow-violet-950/40">
                        <Icon size={25} />
                      </div>

                      <h3 className="mt-6 text-lg font-black text-slate-800 dark:text-white">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {step.description}
                      </p>

                    </div>

                  </motion.div>
                );
              })}

            </div>

          </div>

        </section>

        {/* ==================================================
            FINAL CTA
        ================================================== */}

        <section className="bg-white px-6 py-24 dark:bg-slate-950">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 px-8 py-16 text-center shadow-2xl shadow-violet-200 dark:shadow-violet-950/40 md:px-16 md:py-20"
          >

            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

            <div className="relative">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-xl">
                <Sparkles size={26} />
              </div>

              <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight text-white md:text-5xl">
                Ready to build a resume that stands out?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-violet-100">
                Start analyzing your resume with HireMind and
                take the next step toward your dream job.
              </p>

              <a
                href="/register"
                className="group mx-auto mt-9 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-violet-600 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Get Started Free

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </a>

            </div>

          </motion.div>

        </section>

      </main>

      <Footer />

    </div>
  );
}