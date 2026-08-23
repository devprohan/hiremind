import { useState } from "react";
import {
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

import JobDescriptionForm from "../components/job-match/JobDescriptionForm";
import MatchScoreCard from "../components/job-match/MatchScoreCard";
import SkillsComparison from "../components/job-match/SkillsComparison";
import RecommendationCard from "../components/job-match/RecommendationCard";

import { matchJob } from "../services/jobMatchService";

const JobMatchPage = () => {
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // ANALYZE JOB MATCH
  // =====================================================

  const handleAnalyze = async ({
    resumeId,
    jobDescription,
  }) => {
    try {
      setAnalyzing(true);
      setError("");
      setResult(null);

      console.log("Resume ID:", resumeId);
      console.log(
        "Job Description:",
        jobDescription
      );

      const response = await matchJob(
        resumeId,
        jobDescription
      );

      console.log(
        "JOB MATCH RESPONSE:",
        response
      );

      setResult(response.data);
    } catch (error) {
      console.error(
        "Job Match Error:",
        error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "BACKEND DATA:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
          "Failed to analyze job match."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        space-y-8
        bg-slate-50
        p-2

        transition-colors
        duration-300

        dark:bg-slate-950

        md:p-4
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <div className="flex items-center gap-3">

          {/* ICON */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl

              bg-violet-100
              text-violet-600

              dark:bg-violet-500/20
              dark:text-violet-400
            "
          >
            <BriefcaseBusiness size={25} />
          </div>

          {/* TITLE */}

          <div>
            <h1
              className="
                text-4xl font-black text-slate-900 dark:text-white
              "
            >
              Job Match
            </h1>

            <p
              className="
                mt-1
                text-slate-500

                dark:text-slate-500
              "
            >
              Discover how well your resume matches
              your target job.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          JOB DESCRIPTION FORM
      ================================================= */}

      <JobDescriptionForm
        onAnalyze={handleAnalyze}
        analyzing={analyzing}
      />

      {/* =================================================
          API ERROR
      ================================================= */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-600

            dark:border-red-900/50
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* =================================================
          RESULT
      ================================================= */}

      {result && (
        <div className="space-y-6">

          {/* ANALYSIS HEADER */}

          <div className="flex items-center gap-2">
            <Sparkles
              size={20}
              className="
                text-violet-600

                dark:text-violet-400
              "
            />

            <h2
              className="
                text-xl
                font-bold
                text-slate-800

                dark:text-white
              "
            >
              AI Match Analysis
            </h2>
          </div>

          {/* MATCH SCORE */}

          <MatchScoreCard
            result={result}
          />

          {/* SKILLS */}

          <SkillsComparison
            result={result}
          />

          {/* RECOMMENDATIONS */}

          <RecommendationCard
            result={result}
          />
        </div>
      )}
    </div>
  );
};

export default JobMatchPage;