import { useState } from "react";
import { uploadResume } from "../services/resumeService";
import { useNavigate } from "react-router-dom";

export default function UploadResumePage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("resume", selectedFile);

      const data = await uploadResume(formData);

      alert(data.message);

      navigate("/dashboard/my-resume");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      
      {/* Centered Container */}
      <div className="mx-auto w-full max-w-5xl">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Upload Your Resume
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            Upload your resume in PDF format to get started.
          </p>
        </div>

        {/* Upload Card */}
        <div className="mx-auto mt-10 w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* Drop Zone */}
          <label className="grid h-80 cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50/40 text-center transition hover:bg-violet-50">

            <div>
              <div className="text-6xl">
                ☁
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-800">
                Drag & drop your PDF here
              </h2>

              <p className="mt-2 text-slate-500">
                or click to browse · Max 5MB
              </p>
            </div>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setError("");
              }}
            />

          </label>

          {/* Selected File */}
          {selectedFile && (
            <p className="mt-4 text-center text-sm font-medium text-violet-600">
              Selected: {selectedFile.name}
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="mt-3 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-violet-600 p-4 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload & Analyze"}
          </button>

        </div>
      </div>
    </div>
  );
}