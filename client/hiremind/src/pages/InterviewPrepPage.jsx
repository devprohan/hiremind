import { useState } from "react";
import { BrainCircuit, Sparkles } from "lucide-react";

import InterviewSetup from "../components/interview-prep/InterviewSetup";

import {
  generateInterviewQuestions,
} from "../services/interviewService";

const InterviewPrepPage = () => {
  const [jobRole, setJobRole] = useState("");
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!jobRole.trim()) {
      setError("Please enter a target job role.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await generateInterviewQuestions(jobRole);

      console.log(
        "INTERVIEW RESPONSE:",
        response
      );

       console.error("FULL ERROR:", error);
  console.error("STATUS:", error.response?.status);
  console.error("BACKEND DATA:", error.response?.data);

      setQuestions(response.data);
    } catch (error) {
      console.error(
        "Interview Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to generate interview questions."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">
          <div className="flex items-center gap-2 text-violet-600">
            <Sparkles size={18} />

            <span className="text-sm font-semibold">
              AI Powered Practice
            </span>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <BrainCircuit
              size={34}
              className="text-violet-600"
            />

            <h1 className="text-3xl font-bold text-slate-800">
              Interview Prep
            </h1>
          </div>

          <p className="mt-2 text-slate-500">
            Generate personalized interview questions
            based on your latest resume.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* SETUP */}

        {!questions && (
          <InterviewSetup
            jobRole={jobRole}
            setJobRole={setJobRole}
            onGenerate={handleGenerate}
            loading={loading}
          />
        )}

        {/* QUESTIONS */}

        {questions && (
          <div className="space-y-6">

            {/* TECHNICAL */}

            <QuestionSection
              title="Technical Questions"
              questions={questions.technical}
            />

            {/* BEHAVIORAL */}

            <QuestionSection
              title="Behavioral Questions"
              questions={questions.behavioral}
            />

            {/* HR */}

            <QuestionSection
              title="HR Questions"
              questions={questions.hr}
            />

            <button
              onClick={() => {
                setQuestions(null);
                setJobRole("");
              }}
              className="w-full cursor-pointer rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Generate New Interview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const QuestionSection = ({
  title,
  questions = [],
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-slate-800">
        {title}
      </h2>

      <div className="space-y-3">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-sm font-bold text-violet-600">
              {index + 1}
            </div>

            <p className="leading-7 text-slate-700">
              {question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrepPage;