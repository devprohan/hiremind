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

      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-black">Upload Your Resume</h1>

      <p className="mt-2 text-slate-500">
        Upload your resume in PDF format to get started.
      </p>

      <div className="mt-8 max-w-3xl rounded-3xl border bg-white p-8">
        <label className="grid h-80 cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50/40 text-center">
          <div>
            <div className="text-6xl">☁</div>

            <h2 className="mt-4 text-xl font-bold">
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
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </label>

        {selectedFile && (
          <p className="mt-4 text-center text-sm text-violet-600">
            {selectedFile.name}
          </p>
        )}

        {error && (
          <p className="mt-3 text-center text-red-500">
            {error}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-violet-600 p-4 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload & Analyze"}
        </button>
      </div>
    </>
  );
}