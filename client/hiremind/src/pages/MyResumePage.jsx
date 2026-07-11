import { useState, useEffect } from "react";
import axios from "axios";
import ResumeStats from "../components/resumes/ResumeStats";
import SearchBar from "../components/resumes/SearchBar";
import ResumeCard from "../components/resumes/ResumeCard";

import ResumeGrid from "../components/resumes/ResumeGrid";
import FilterBar from "../components/resumes/FilterBar";
import UploadMore from "../components/resumes/UploadMore";

export default function MyResumesPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const fetchResumes = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:8080/api/resume/my-resumes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    setResumes(response.data.resumes);
  } catch (error) {
    console.log(error.response?.data || error.message);
  } finally {
  setLoading(false);
}
};

useEffect(() => {
  fetchResumes();
}, []);
const filteredResumes = resumes.filter((resume) =>
  resume.fileName.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900">My Resumes</h1>

          <p className="mt-2 text-slate-500">
            Manage and analyze all your uploaded resumes
          </p>
        </div>
      </div>

      <SearchBar search={search}
    setSearch={setSearch}/>

      <ResumeStats />

      <FilterBar />

      <ResumeGrid  loading={loading} resumes={filteredResumes}/>
      <UploadMore />
    </div>
  );
}
