import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Rocket,
} from "lucide-react";

const SuggestionsCard = ({
  resume,
  aiSuggestions = true,
}) => {
  // AI Suggestions OFF
  if (!aiSuggestions) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <Lightbulb size={30} />
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          AI Suggestions are disabled
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          Enable AI Suggestions from Preferences to
          view personalized resume recommendations.
        </p>

      </div>
    );
  }

  // AI Suggestions ON
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 text-white shadow-xl">

        <div className="flex items-start gap-4">

          <div className="rounded-2xl bg-white/20 p-3">
            <Lightbulb size={30} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              AI Resume Suggestions
            </h2>

            <p className="mt-2 text-purple-100">
              Improve these areas to increase your ATS
              score and recruiter visibility.
            </p>
          </div>

        </div>

      </div>

      {/* Strengths */}
      <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm dark:border-green-900 dark:bg-slate-900">

        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-green-700 dark:text-green-400">
          <CheckCircle2 />
          Strengths
        </h3>

        <div className="space-y-4">

          {(resume.strengths || []).map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl bg-green-50 p-4 dark:bg-green-500/10"
              >

                <CheckCircle2
                  className="mt-1 shrink-0 text-green-600"
                  size={18}
                />

                <p className="text-slate-700 dark:text-slate-300">
                  {item}
                </p>

              </div>
            )
          )}

        </div>

      </div>

      {/* Weaknesses */}
      <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900 dark:bg-slate-900">

        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-400">
          <AlertTriangle />
          Areas to Improve
        </h3>

        <div className="space-y-4">

          {(resume.weaknesses || []).map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl bg-red-50 p-4 dark:bg-red-500/10"
              >

                <AlertTriangle
                  className="mt-1 shrink-0 text-red-500"
                  size={18}
                />

                <p className="text-slate-700 dark:text-slate-300">
                  {item}
                </p>

              </div>
            )
          )}

        </div>

      </div>

      {/* Recommended Action Plan */}
      <div className="rounded-3xl border border-violet-200 bg-white p-6 shadow-sm dark:border-violet-900 dark:bg-slate-900">

        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-violet-700 dark:text-violet-400">
          <Rocket />
          Recommended Action Plan
        </h3>

        <div className="space-y-4">

          {(resume.suggestions || []).map(
            (item, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700"
              >

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <p className="text-slate-700 dark:text-slate-300">
                  {item.replace(/\*\*/g, "")}
                </p>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
};

export default SuggestionsCard;