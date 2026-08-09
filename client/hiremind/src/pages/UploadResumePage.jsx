import { useState } from "react";
import { uploadResume } from "../services/resumeService";
import { useNavigate } from "react-router-dom";

export default function UploadResumePage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // -----------------------------
  // Handle Selected File
  // -----------------------------
  const handleFile = (file) => {
    setError("");

    if (!file) return;

    // PDF validation
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setSelectedFile(null);
      setError("Only PDF files are allowed.");
      return;
    }

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      setSelectedFile(null);
      setError("File size must be less than 5MB.");
      return;
    }

    setSelectedFile(file);
  };

  // -----------------------------
  // Browse
  // -----------------------------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    handleFile(file);

    // Allow selecting same file again
    e.target.value = "";
  };

  // -----------------------------
  // Drag Over
  // -----------------------------
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  // -----------------------------
  // Drag Leave
  // -----------------------------
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  };

  // -----------------------------
  // Drop
  // -----------------------------
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    handleFile(file);
  };

  // -----------------------------
  // Upload
  // -----------------------------
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select your resume first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("resume", selectedFile);

      const data = await uploadResume(formData);

      console.log("Upload Success:", data);

      navigate("/dashboard/my-resume");

    } catch (err) {
      console.error("Resume Upload Error:", err);

      const status = err.response?.status;
      const serverMessage = err.response?.data?.message;

      // ---------------------------------
      // Gemini quota / rate limit
      // ---------------------------------
      if (
        status === 429 ||
        serverMessage?.includes("RESOURCE_EXHAUSTED") ||
        serverMessage?.includes("quota") ||
        serverMessage?.includes("Quota exceeded") ||
        serverMessage?.includes(
          "generate_content_free_tier_requests"
        )
      ) {
        setError(
          "AI analysis is temporarily unavailable. Please try again later."
        );

        return;
      }

      // ---------------------------------
      // Hide raw JSON / Gemini errors
      // ---------------------------------
      if (
        typeof serverMessage === "string" &&
        (
          serverMessage.trim().startsWith("{") ||
          serverMessage.includes('"error"') ||
          serverMessage.includes(
            "generativelanguage.googleapis.com"
          ) ||
          serverMessage.includes("google.rpc")
        )
      ) {
        setError(
          "Unable to analyze your resume right now. Please try again later."
        );

        return;
      }

      // ---------------------------------
      // Normal backend error
      // ---------------------------------
      setError(
        serverMessage ||
          "Unable to analyze your resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">

      {/* =========================
          Heading
      ========================== */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Upload Your Resume
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Upload your resume in PDF format to get started.
        </p>
      </div>

      {/* =========================
          Upload Card
      ========================== */}
      <div className="mx-auto mt-10 w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        {/* =========================
            Drop Zone
        ========================== */}
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`grid h-80 cursor-pointer place-items-center rounded-2xl border-2 border-dashed text-center transition-all duration-200 ${
            isDragging
              ? "scale-[1.01] border-violet-600 bg-violet-100"
              : "border-violet-300 bg-violet-50/40 hover:bg-violet-50"
          }`}
        >
          <div>

            {/* Cloud Icon */}
            <div
              className={`text-6xl transition-transform duration-200 ${
                isDragging ? "scale-110" : ""
              }`}
            >
              ☁️
            </div>

            {/* Title */}
            <h2 className="mt-4 text-xl font-bold text-slate-800">
              {isDragging
                ? "Drop your resume here"
                : "Drag & drop your PDF here"}
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-slate-500">
              or click to browse · Max 5MB
            </p>

          </div>

          <input
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* =========================
            Selected File
        ========================== */}
        {selectedFile && !error && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50 p-4">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xl">
                📄
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-violet-700">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setError("");
              }}
              className="ml-3 shrink-0 rounded-lg px-3 py-1 text-sm font-medium text-red-500 transition hover:bg-red-100"
            >
              Remove
            </button>

          </div>
        )}

        {/* =========================
            Error
        ========================== */}
        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
              <span className="text-lg">⚠️</span>
            </div>

            <div className="flex-1">
              <p className="font-semibold text-red-700">
                Analysis unavailable
              </p>

              <p className="mt-1 text-sm leading-5 text-red-600">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-sm text-red-400 transition hover:text-red-600"
            >
              ✕
            </button>

          </div>
        )}

        {/* =========================
            Upload Button
        ========================== */}
        <button
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          className="mt-6 w-full rounded-xl bg-violet-600 p-4 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Analyzing Resume...
            </span>
          ) : error ? (
            "Try Again"
          ) : (
            "Upload & Analyze"
          )}
        </button>

      </div>
    </div>
  );
}