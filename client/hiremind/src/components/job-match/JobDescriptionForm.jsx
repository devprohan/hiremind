import { useEffect, useState } from "react";
import {
  FileText,
  Sparkles,
  LoaderCircle,
  BriefcaseBusiness,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getMyResumes } from "../../services/profileService";

const JobDescriptionForm = ({ onAnalyze, analyzing }) => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loadingResumes, setLoadingResumes] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      setError("");

      const response = await getMyResumes();

      console.log("Resumes:", response);

      setResumes(response?.resumes || []);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);

      setResumes([]);
      setError("Unable to load your resumes.");
    } finally {
      setLoadingResumes(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!resumeId) {
      setError("Please select a resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    onAnalyze({
      resumeId,
      jobDescription,
    });
  };

  // Loading state
  if (loadingResumes) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex items-center justify-center gap-3 text-slate-500">
          <LoaderCircle
            size={20}
            className="animate-spin text-violet-600"
          />

          <span>Loading your resumes...</span>
        </div>
      </div>
    );
  }

  // No resumes - New User
  if (resumes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
          <FileText
            size={30}
            className="text-violet-600"
          />
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-xl font-bold text-slate-900">
          No Resume Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          You need to upload a resume before you can
          analyze how well it matches a job description.
        </p>

        {/* Error */}
        {error && (
          <div className="mx-auto mt-4 max-w-md rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Upload button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/upload-resume")}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-violet-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-violet-700
            hover:shadow-lg
          "
        >
          <FileText size={18} />
          Upload Resume
        </button>
      </div>
    );
  }

  // Resumes available
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <BriefcaseBusiness
            size={22}
            className="text-violet-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Analyze Job Match
          </h2>

          <p className="text-sm text-slate-500">
            Compare your resume with a job description
          </p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        {/* Resume */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Select Resume
          </label>

          <div className="relative">

            <FileText
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="
                w-full
                cursor-pointer
                appearance-none
                rounded-xl
                border
                border-slate-200
                bg-white
                py-3
                pl-11
                pr-4
                text-slate-700
                outline-none
                transition
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-100
              "
            >
              <option value="">
                Choose a resume
              </option>

              {resumes.map((resume) => (
                <option
                  key={resume._id}
                  value={resume._id}
                >
                  {resume.originalName}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Job Description */}
        <div className="mt-5">

          <div className="mb-2 flex items-center justify-between">

            <label className="text-sm font-semibold text-slate-700">
              Job Description
            </label>

            <span className="text-xs text-slate-400">
              {jobDescription.length} characters
            </span>

          </div>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            rows={10}
            placeholder="Paste the complete job description here..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-200
              p-4
              text-sm
              leading-6
              text-slate-700
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-100
            "
          />

        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Analyze Button */}
        <button
          type="submit"
          disabled={analyzing}
          className="
            mt-5
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-violet-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {analyzing ? (
            <>
              <LoaderCircle
                size={19}
                className="animate-spin"
              />

              Analyzing Resume...
            </>
          ) : (
            <>
              <Sparkles size={19} />

              Analyze Job Match
            </>
          )}

        </button>

      </form>
    </div>
  );
};

export default JobDescriptionForm;