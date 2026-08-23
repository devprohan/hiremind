import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const FeedbackTab = ({ resume }) => {
  const breakdown = [
    {
      title: "Technical Skills",
      score: resume.breakdown?.skills || 0,
      color: "bg-violet-600",
    },
    {
      title: "Resume Structure",
      score: resume.breakdown?.content || 0,
      color: "bg-indigo-600",
    },
    {
      title: "Formatting",
      score: resume.breakdown?.formatting || 0,
      color: "bg-purple-600",
    },
    {
      title: "ATS Keywords",
      score: resume.breakdown?.keywords || 0,
      color: "bg-violet-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* =========================
          HERO
      ========================= */}

      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-violet-600
          via-purple-600
          to-indigo-600
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex items-start gap-4">

          <div className="rounded-2xl bg-white/20 p-3">
            <ClipboardCheck size={30} />
          </div>

          <div className="flex-1">

            <h2 className="text-2xl font-bold text-white">
              AI Resume Feedback
            </h2>

            <p className="mt-2 text-purple-100">
              {resume.summary}
            </p>

            <div className="mt-6 flex items-center gap-6">

              <div>
                <p className="text-sm text-purple-200">
                  ATS Score
                </p>

                <p className="text-4xl font-black text-white">
                  {resume.atsScore}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =========================
          STRENGTHS + WEAKNESSES
      ========================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* =========================
            STRENGTHS
        ========================= */}

        <div
          className="
            rounded-3xl
            border
            border-green-200
            bg-white
            p-6
            shadow-sm

            dark:border-green-900
            dark:bg-slate-900
          "
        >

          <h3
            className="
              mb-5
              flex
              items-center
              gap-2
              text-xl
              font-bold
              text-green-700

              dark:text-green-400
            "
          >
            <CheckCircle2 />
            Strengths
          </h3>

          <div className="space-y-4">

            {(resume.strengths || []).map(
              (item, index) => (

                <div
                  key={index}
                  className="
                    flex
                    gap-3
                    rounded-xl
                    bg-green-50
                    p-4

                    dark:bg-green-500/10
                  "
                >

                  <CheckCircle2
                    size={18}
                    className="
                      mt-1
                      shrink-0
                      text-green-600

                      dark:text-green-400
                    "
                  />

                  <p
                    className="
                      text-slate-700

                      dark:text-slate-200
                    "
                  >
                    {item}
                  </p>

                </div>
              )
            )}

          </div>
        </div>

        {/* =========================
            WEAKNESSES
        ========================= */}

        <div
          className="
            rounded-3xl
            border
            border-red-200
            bg-white
            p-6
            shadow-sm

            dark:border-red-900
            dark:bg-slate-900
          "
        >

          <h3
            className="
              mb-5
              flex
              items-center
              gap-2
              text-xl
              font-bold
              text-red-600

              dark:text-red-400
            "
          >
            <AlertTriangle />
            Needs Attention
          </h3>

          <div className="space-y-4">

            {(resume.weaknesses || []).map(
              (item, index) => (

                <div
                  key={index}
                  className="
                    flex
                    gap-3
                    rounded-xl
                    bg-red-50
                    p-4

                    dark:bg-red-500/10
                  "
                >

                  <AlertTriangle
                    size={18}
                    className="
                      mt-1
                      shrink-0
                      text-red-500

                      dark:text-red-400
                    "
                  />

                  <p
                    className="
                      text-slate-700

                      dark:text-slate-200
                    "
                  >
                    {item}
                  </p>

                </div>
              )
            )}

          </div>
        </div>

      </div>

      {/* =========================
          RECRUITER PERSPECTIVE
      ========================= */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        <h3
          className="
            mb-6
            text-xl
            font-bold
            text-slate-800

            dark:text-white
          "
        >
          Recruiter Perspective
        </h3>

        <div className="space-y-6">

          {breakdown.map((item) => (

            <div key={item.title}>

              <div className="mb-2 flex justify-between">

                <span
                  className="
                    font-medium
                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  {item.title}
                </span>

                <span
                  className="
                    font-semibold
                    text-slate-800

                    dark:text-slate-100
                  "
                >
                  {item.score}%
                </span>

              </div>

              <div
                className="
                  h-3
                  overflow-hidden
                  rounded-full
                  bg-slate-200

                  dark:bg-slate-700
                "
              >
                <div
                  className={`
                    ${item.color}
                    h-full
                    rounded-full
                    transition-all
                    duration-700
                  `}
                  style={{
                    width: `${item.score}%`,
                  }}
                />
              </div>

            </div>

          ))}

        </div>
      </div>

    </div>
  );
};

export default FeedbackTab;