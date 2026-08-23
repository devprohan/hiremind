import { useState } from "react";
import { uploadResume } from "../services/resumeService";
import { useNavigate } from "react-router-dom";

export default function UploadResumePage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // =====================================================
  // HANDLE SELECTED FILE
  // =====================================================

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

  // =====================================================
  // BROWSE
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    handleFile(file);

    // Allow selecting same file again
    e.target.value = "";
  };

  // =====================================================
  // DRAG OVER
  // =====================================================

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  // =====================================================
  // DRAG LEAVE
  // =====================================================

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  };

  // =====================================================
  // DROP
  // =====================================================

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    handleFile(file);
  };

  // =====================================================
  // UPLOAD
  // =====================================================

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

      // =================================================
      // GEMINI QUOTA / RATE LIMIT
      // =================================================

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

      // =================================================
      // HIDE RAW GEMINI ERRORS
      // =================================================

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

      // =================================================
      // NORMAL BACKEND ERROR
      // =================================================

      setError(
        serverMessage ||
          "Unable to analyze your resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-5xl

        transition-colors
        duration-300
      "
    >
      {/* =================================================
          HEADING
      ================================================= */}

      <div className="text-center">
        <h1
          className="
           text-4xl font-black text-slate-900 dark:text-white
          "
        >
          Upload Your Resume
        </h1>

        <p
          className="
            mt-2
            text-lg
            text-slate-500

            dark:text-slate-500
          "
        >
          Upload your resume in PDF format to get started.
        </p>
      </div>

      {/* =================================================
          UPLOAD CARD
      ================================================= */}

      <div
        className="
          mx-auto
          mt-10
          w-full
          rounded-3xl

          border
          border-slate-200

          bg-white

          p-8

          shadow-sm

          transition-colors
          duration-300

          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* =================================================
            DROP ZONE
        ================================================= */}

        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            grid
            h-80
            cursor-pointer
            place-items-center
            rounded-2xl
            border-2
            border-dashed
            text-center
            transition-all
            duration-200

            ${
              isDragging
                ? `
                  scale-[1.01]
                  border-violet-600
                  bg-violet-100

                  dark:border-violet-400
                  dark:bg-violet-500/10
                `
                : `
                  border-violet-300
                  bg-violet-50/40

                  hover:bg-violet-50

                  dark:border-violet-500/40
                  dark:bg-violet-500/5
                  dark:hover:bg-violet-500/10
                `
            }
          `}
        >
          <div>
            {/* CLOUD ICON */}

            <div
              className={`
                text-6xl
                transition-transform
                duration-200

                ${isDragging ? "scale-110" : ""}
              `}
            >
              ☁️
            </div>

            {/* TITLE */}

            <h2
              className="
                mt-4
                text-xl
                font-bold
                text-slate-800

                dark:text-slate-900
              "
            >
              {isDragging
                ? "Drop your resume here"
                : "Drag & drop your PDF here"}
            </h2>

            {/* SUBTITLE */}

            <p
              className="
                mt-2
                text-slate-500

                dark:text-slate-500
              "
            >
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

        {/* =================================================
            SELECTED FILE
        ================================================= */}

        {selectedFile && !error && (
          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              rounded-xl

              border
              border-violet-200

              bg-violet-50

              p-4

              dark:border-violet-500/30
              dark:bg-violet-500/10
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* FILE ICON */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg

                  bg-violet-100

                  text-xl

                  dark:bg-violet-500/20
                "
              >
                📄
              </div>

              {/* FILE INFO */}

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-violet-700

                    dark:text-violet-400
                  "
                >
                  {selectedFile.name}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  {(
                    selectedFile.size /
                    (1024 * 1024)
                  ).toFixed(2)}{" "}
                  MB
                </p>
              </div>
            </div>

            {/* REMOVE */}

            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setError("");
              }}
              className="
                ml-3
                shrink-0
                rounded-lg
                px-3
                py-1
                text-sm
                font-medium
                text-red-500

                transition

                hover:bg-red-100

                dark:text-red-400
                dark:hover:bg-red-500/10
              "
            >
              Remove
            </button>
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="
              mt-4
              flex
              items-start
              gap-3
              rounded-xl

              border
              border-red-200

              bg-red-50

              p-4

              dark:border-red-900/50
              dark:bg-red-500/10
            "
          >
            {/* WARNING ICON */}

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full

                bg-red-100

                dark:bg-red-500/20
              "
            >
              <span className="text-lg">
                ⚠️
              </span>
            </div>

            {/* ERROR MESSAGE */}

            <div className="flex-1">
              <p
                className="
                  font-semibold
                  text-red-700

                  dark:text-red-400
                "
              >
                Analysis unavailable
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-5
                  text-red-600

                  dark:text-red-400/90
                "
              >
                {error}
              </p>
            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setError("")}
              className="
                text-sm
                text-red-400
                transition

                hover:text-red-600

                dark:hover:text-red-300
              "
            >
              ✕
            </button>
          </div>
        )}

        {/* =================================================
            UPLOAD BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          className="
            mt-6
            w-full
            rounded-xl

            bg-violet-600

            p-4

            font-semibold
            text-white

            transition

            hover:bg-violet-700

            dark:bg-violet-600
            dark:hover:bg-violet-500

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span
                className="
                  h-5
                  w-5
                  animate-spin
                  rounded-full
                  border-2
                  border-white
                  border-t-transparent
                "
              />

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