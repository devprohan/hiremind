import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/resume-analysis/Header";
import Tabs from "../components/resume-analysis/Tabs";
import ATSScoreCard from "../components/resume-analysis/ATSScoreCard";
import ScoreBreakdown from "../components/resume-analysis/ScoreBreakdown";
import StrengthsCard from "../components/resume-analysis/StrengthsCard";
import WeaknessCard from "../components/resume-analysis/WeaknessCard";
import SkillsTab from "../components/resume-analysis/SkillsTab";
import SuggestionsCard from "../components/resume-analysis/SuggestionsCard";
import FeedbackTab from "../components/resume-analysis/FeedbackTab";

import { getResumeById } from "../services/resumeService";
import { getPreferences } from "../services/userService";

export default function ResumeAnalysisPage() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [error, setError] = useState("");

  // =========================
  // Fetch Resume
  // =========================

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { resume } = await getResumeById(id);

        console.log("Resume:", resume);

        setResume(resume);
      } catch (err) {
        console.error(err);
        setError("Unable to load resume.");
      }
    };

    fetchResume();
  }, [id]);

  // =========================
  // Fetch Preferences
  // =========================

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const data = await getPreferences();

        console.log(
          "Preferences:",
          data.preferences
        );

        if (data.success) {
          setPreferences(data.preferences);
        }
      } catch (error) {
        console.error(
          "Failed to load preferences:",
          error
        );

        // Default behavior
        setPreferences({
          aiSuggestions: true,
        });
      }
    };

    loadPreferences();
  }, []);

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
        "
      >
        <p
          className="
            text-red-500
            dark:text-red-400
          "
        >
          {error}
        </p>
      </div>
    );
  }

  // =========================
  // Loading
  // =========================

  if (!resume || !preferences) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
        "
      >
        <p
          className="
            text-slate-500
            dark:text-slate-400
          "
        >
          Loading Resume...
        </p>
      </div>
    );
  }

  // =========================
  // Score Breakdown
  // =========================

  const breakdown = [
    {
      title: "Content",
      score: resume.breakdown?.content || 0,
    },
    {
      title: "Formatting",
      score: resume.breakdown?.formatting || 0,
    },
    {
      title: "Skills",
      score: resume.breakdown?.skills || 0,
    },
    {
      title: "Keywords",
      score: resume.breakdown?.keywords || 0,
    },
  ];

  return (
    <div
      className="
        space-y-8
        text-slate-900
        dark:text-slate-100
      "
    >

      {/* =========================
          HEADER
      ========================= */}

      <Header resume={resume} />

      {/* =========================
          TABS
      ========================= */}

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* =========================
          OVERVIEW
      ========================= */}

      {activeTab === "Overview" && (
        <>
          <div className="grid gap-8 lg:grid-cols-2">

            <ATSScoreCard
              score={resume.atsScore}
            />

            <ScoreBreakdown
              breakdown={breakdown}
            />

          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            <StrengthsCard
              strengths={
                resume.strengths || []
              }
            />

            <WeaknessCard
              weaknesses={
                resume.weaknesses || []
              }
            />

          </div>
        </>
      )}

      {/* =========================
          SKILLS
      ========================= */}

      {activeTab === "Skills" && (
        <SkillsTab
          resume={resume}
        />
      )}

      {/* =========================
          AI SUGGESTIONS
      ========================= */}

      {activeTab === "Suggestions" && (
        <SuggestionsCard
          resume={resume}
          aiSuggestions={
            preferences.aiSuggestions === true
          }
        />
      )}

      {/* =========================
          FEEDBACK
      ========================= */}

      {activeTab === "Feedback" && (
        <FeedbackTab
          resume={resume}
        />
      )}

    </div>
  );
}