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

  const handleAnalyze = async ({
    resumeId,
    jobDescription,
  }) => {
    try {
      setAnalyzing(true);
      setError("");
      setResult(null);

      console.log("Resume ID:", resumeId);
      console.log("Job Description:", jobDescription);

      const response = await matchJob(
        resumeId,
        jobDescription
      );

      console.log("JOB MATCH RESPONSE:", response);

      setResult(response.data);
    } catch (error) {
      console.error("Job Match Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to analyze job match."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-7 p-6 lg:p-8">

        {/* Header */}

        <div>
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
              <BriefcaseBusiness
                size={25}
                className="text-violet-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Job Match
              </h1>

              <p className="mt-1 text-slate-500">
                Discover how well your resume matches
                your target job.
              </p>
            </div>

          </div>
        </div>

        {/* Form */}

        <JobDescriptionForm
          onAnalyze={handleAnalyze}
          analyzing={analyzing}
        />

        {/* API Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Result */}

        {result && (
          <div className="space-y-6">

            <div className="flex items-center gap-2">
              <Sparkles
                size={20}
                className="text-violet-600"
              />

              <h2 className="text-xl font-bold text-slate-800">
                AI Match Analysis
              </h2>
            </div>

            <MatchScoreCard result={result} />

            <SkillsComparison result={result} />

            <RecommendationCard result={result} />

          </div>
        )}

      </div>
    </div>
  );
};

export default JobMatchPage;