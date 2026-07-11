import { useState } from "react";
import axios from "axios";
export default function UploadResumePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUpload = async() => {
  if (!selectedFile) {
    alert("Please select a PDF first");
    return;
  }

  const formData = new FormData();

  formData.append("resume", selectedFile);
   const token = localStorage.getItem("token");
    try {
    const response = await axios.post(
      "http://localhost:8080/api/resume/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Upload Response:", response.data);
  } catch (error) {
    console.log("Upload Error:", error.response?.data || error.message);
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
            <p className="mt-2 text-slate-500">or click to browse · Max 5MB</p>
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
        <button className="mt-6 w-full rounded-xl bg-violet-600 p-4 font-semibold text-white"
        onClick={handleUpload} >
          Upload & Analyze
        </button>
      </div>
    </>
  );
}
