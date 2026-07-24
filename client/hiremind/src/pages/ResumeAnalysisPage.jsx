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

export default function ResumeAnalysisPage() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const [error, setError] = useState("");
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { resume } = await getResumeById(id);
        console.log(resume);

        setResume(resume);
      } catch (err) {
        console.error(err);
        setError("Unable to load resume.");
      }
    };

    fetchResume();
  }, [id]);

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  if (!resume) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-lg font-medium text-slate-500">
          Loading Resume...
        </div>
      </div>
    );
  }
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
    <div className="p-8">
      <Header resume={resume} />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Overview" && (
        <>
          <div className="grid lg:grid-cols-2 gap-8">
            <ATSScoreCard score={resume.atsScore} />
            <ScoreBreakdown breakdown={breakdown} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <StrengthsCard strengths={resume.strengths || []} />
            <WeaknessCard weaknesses={resume.weaknesses || []} />
          </div>
        </>
      )}

      {activeTab === "Skills" && <SkillsTab resume={resume} />}

      {activeTab === "Suggestions" && <SuggestionsCard resume={resume} />}

      {activeTab === "Feedback" && <FeedbackTab resume={resume} />}
    </div>
  );
}
