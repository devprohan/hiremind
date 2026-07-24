import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Rocket,
} from "lucide-react";

const SuggestionsTab = ({ resume }) => {
    console.log(resume);
  return (
    <div className="space-y-8">

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

            <p className="mt-2 text-orange-100">
              Improve these areas to increase your ATS score and recruiter visibility.
            </p>

          </div>

        </div>

      </div>

      {/* Strengths */}

      <div className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm">

        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-green-700">

          <CheckCircle2 />

          Strengths

        </h3>

        <div className="space-y-4">

          {(resume.strengths || []).map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
            >
              <CheckCircle2
                className="mt-1 text-green-600"
                size={18}
              />

              <p>{item}</p>

            </div>

          ))}

        </div>

      </div>

      {/* Weaknesses */}

      <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-red-600">

          <AlertTriangle />

          Areas to Improve

        </h3>

        <div className="space-y-4">

          {(resume.weaknesses || []).map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-3 rounded-xl bg-red-50 p-4"
            >
              <AlertTriangle
                className="mt-1 text-red-500"
                size={18}
              />

              <p>{item}</p>

            </div>

          ))}

        </div>

      </div>

      {/* Suggestions */}

      <div className="rounded-3xl border border-violet-200 bg-white p-6 shadow-sm">

        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-violet-700">

          <Rocket />

          Recommended Action Plan

        </h3>

        <div className="space-y-4">

          {(resume.suggestions || []).map((item, index) => (

            <div
              key={index}
              className="flex gap-4 rounded-xl border border-slate-200 p-4"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                {index + 1}
              </div>

              <p className="text-slate-700">
                {item.replace(/\*\*/g, "")}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default SuggestionsTab;