import {
  FileText,
  Target,
  BarChart3,
  PieChart,
  ArrowUp,
  Sparkles,
  Rocket,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    title: "Total Resumes",
    value: 12,
    change: "3 this month",
    icon: FileText,
    iconStyle: "bg-violet-100 text-violet-600",
    line: "M0 30 C20 28, 25 20, 45 24 S70 10, 90 18 S120 6, 145 15 S170 5, 200 0",
  },
  {
    title: "Highest ATS Score",
    value: 92,
    change: "6 improvement",
    icon: Target,
    iconStyle: "bg-emerald-100 text-emerald-600",
    line: "M0 24 C20 30, 35 18, 55 20 S80 10, 100 16 S125 25, 145 10 S175 2, 200 8",
  },
  {
    title: "Average ATS Score",
    value: 78,
    change: "4 this month",
    icon: BarChart3,
    iconStyle: "bg-blue-100 text-blue-600",
    line: "M0 28 C20 18, 30 30, 50 18 S70 10, 90 20 S115 25, 135 8 S160 18, 180 0 S195 5, 200 2",
  },
  {
    title: "Analyses Done",
    value: 15,
    change: "5 this month",
    icon: PieChart,
    iconStyle: "bg-pink-100 text-pink-600",
    line: "M0 25 C20 15, 40 22, 55 12 S75 25, 95 15 S120 22, 140 5 S165 20, 180 8 S195 0, 200 2",
  },
];

const trend = [
  { day: "Mon", score: 35 },
  { day: "Tue", score: 55 },
  { day: "Wed", score: 45 },
  { day: "Thu", score: 70 },
  { day: "Fri", score: 60 },
  { day: "Sat", score: 90 },
  { day: "Sun", score: 82 },
];

const resumeScores = [
  { title: "Content", score: 96 },
  { title: "Format", score: 88 },
  { title: "Skills", score: 94 },
  { title: "Relevance", score: 90 },
];

export default function DashboardPage() {
  const chartPoints = trend
    .map((item, index) => {
      const x = 35 + index * 80;
      const y = 220 - item.score * 1.8;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="min-h-screen bg-[#fafaff]">
      {/* HEADER */}

      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Welcome back, Rohan 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Track your resume performance and improve your chances of getting
            hired.
          </p>
        </div>

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-violet-200 hover:shadow-md">
          <CalendarDays size={17} />

          May 20 - May 26, 2024
        </button>
      </section>

      {/* STATS */}

      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(80,70,140,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(124,58,237,0.12)]"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={22} />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                {stat.title}
              </p>

              <p className="mt-1 text-4xl font-black text-slate-900">
                {stat.value}
              </p>

              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-500">
                <ArrowUp size={13} />

                {stat.change}
              </div>

              <svg
                viewBox="0 0 200 35"
                className="mt-5 h-9 w-full overflow-visible"
              >
                <path
                  d={stat.line}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-violet-500"
                />
              </svg>
            </div>
          );
        })}
      </section>

      {/* ANALYTICS */}

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        {/* ATS CHART */}

        <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(80,70,140,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                ATS Score Trend
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your resume performance over the last 7 days
              </p>
            </div>

            <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>

          <div className="mt-8 overflow-x-auto">
            <svg
              viewBox="0 0 550 260"
              className="h-[270px] min-w-[500px] w-full"
            >
              {[40, 85, 130, 175, 220].map((y) => (
                <line
                  key={y}
                  x1="30"
                  y1={y}
                  x2="525"
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}

              <defs>
                <linearGradient
                  id="chartGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />

                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>

              <polygon
                points={`${chartPoints} 515,220 35,220`}
                fill="url(#chartGradient)"
              />

              <polyline
                points={chartPoints}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {trend.map((item, index) => {
                const x = 35 + index * 80;
                const y = 220 - item.score * 1.8;

                return (
                  <g key={item.day}>
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#7c3aed"
                      stroke="white"
                      strokeWidth="3"
                    />

                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      className="fill-slate-700 text-[11px] font-bold"
                    >
                      {item.score}
                    </text>

                    <text
                      x={x}
                      y="245"
                      textAnchor="middle"
                      className="fill-slate-400 text-[11px]"
                    >
                      {item.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex items-start gap-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
              <TrendingIcon />
            </div>

            <div>
              <p className="font-bold text-violet-600">Insight</p>

              <p className="mt-1 text-sm text-slate-600">
                Great job! Your ATS score is improving steadily.
              </p>
            </div>
          </div>
        </div>

        {/* RESUME ANALYSIS */}

        <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(80,70,140,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">
              Recent Resume Analysis
            </h2>

            <button className="text-sm font-bold text-violet-600">
              View all
            </button>
          </div>

          <div className="mt-7 flex items-center justify-between rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
                <FileText size={23} />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  Resume_SDE.pdf
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Analyzed 2 hours ago
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-black text-emerald-500">
                92
              </p>

              <p className="text-xs text-slate-400">
                ATS Score
              </p>
            </div>
          </div>

          <div className="mt-8 grid items-center gap-8 md:grid-cols-[150px_1fr]">
            {/* CIRCLE */}

            <div className="relative mx-auto h-36 w-36">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  fill="none"
                  stroke="#ecfdf5"
                  strokeWidth="10"
                />

                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="364"
                  strokeDashoffset="29"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-black text-emerald-500">
                  92
                </p>

                <p className="text-xs text-slate-400">
                  out of 100
                </p>
              </div>
            </div>

            {/* BREAKDOWN */}

            <div className="space-y-5">
              {resumeScores.map((item) => (
                <div key={item.title}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-semibold text-slate-600">
                      {item.title}
                    </span>

                    <span className="font-bold text-slate-600">
                      {item.score}/100
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 p-5">
            <Sparkles
              size={21}
              className="mt-1 shrink-0 text-violet-600"
            />

            <div>
              <p className="font-bold text-violet-600">
                Excellent!
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Your resume is well-optimized and ATS-friendly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 p-7">
        <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-violet-300/30 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-lg shadow-violet-200">
              <Rocket size={30} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                Improve your score even more!
              </h3>

              <p className="mt-1 max-w-lg text-sm leading-6 text-slate-600">
                Get personalized suggestions to make your resume stand out
                and land more interviews.
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            Analyze Again

            <Sparkles size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}

function TrendingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 17l6-6 4 4 8-8" />

      <path d="M15 7h6v6" />
    </svg>
  );
}