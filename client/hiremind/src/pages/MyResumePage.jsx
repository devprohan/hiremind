import { useState, useEffect } from "react";

import {
  getMyResumes,
  deleteResume,
} from "../services/resumeService";

import ResumeStats from "../components/resumes/ResumeStats";
import SearchBar from "../components/resumes/SearchBar";
import ResumeGrid from "../components/resumes/ResumeGrid";
import FilterBar from "../components/resumes/FilterBar";
import UploadMore from "../components/resumes/UploadMore";

export default function MyResumesPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  // =====================================================
  // FETCH RESUMES
  // =====================================================

  const fetchResumes = async () => {
    try {
      setLoading(true);

      const data = await getMyResumes();

      setResumes(data.resumes || []);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  let filtered = resumes.filter((resume) =>
    (resume.originalName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =====================================================
  // FILTER
  // =====================================================

  filtered = filtered.filter((resume) => {
    const score = Number(resume.atsScore);

    switch (filter) {
      case "Excellent":
        return score >= 90;

      case "Good":
        return score >= 75 && score < 90;

      case "Average":
        return score >= 50 && score < 75;

      case "Poor":
        return score < 50;

      default:
        return true;
    }
  });

  // =====================================================
  // SORT
  // =====================================================

  filtered.sort((a, b) => {
    switch (sort) {
      case "Newest":
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );

      case "Oldest":
        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );

      case "Highest":
        return (
          Number(b.atsScore) -
          Number(a.atsScore)
        );

      case "Lowest":
        return (
          Number(a.atsScore) -
          Number(b.atsScore)
        );

      default:
        return 0;
    }
  });

  // =====================================================
  // STATS
  // =====================================================

  const total = resumes.length;

  const highest =
    resumes.length > 0
      ? Math.max(
          ...resumes.map((r) =>
            Number(r.atsScore) || 0
          )
        )
      : 0;

  const average =
    resumes.length > 0
      ? Math.round(
          resumes.reduce(
            (sum, r) =>
              sum +
              (Number(r.atsScore) || 0),
            0
          ) / resumes.length
        )
      : 0;

  // =====================================================
  // DELETE RESUME
  // =====================================================

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!ok) return;

    try {
      await deleteResume(id);

      setResumes((prev) =>
        prev.filter(
          (resume) => resume._id !== id
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete resume:",
        err
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        min-h-screen
        space-y-8

        transition-colors
        duration-300
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h1
          className="
            text-4xl font-black text-slate-900 dark:text-white
          "
        >
          My Resumes
        </h1>

        <p
          className="
            mt-2
            text-slate-500

            dark:text-slate-500
          "
        >
          Manage and analyze all your uploaded resumes
        </p>
      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* =================================================
          STATS
      ================================================= */}

      <ResumeStats
        total={total}
        average={average}
        highest={highest}
      />

      {/* =================================================
          FILTER
      ================================================= */}

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      {/* =================================================
          RESUME GRID
      ================================================= */}

      <ResumeGrid
        resumes={filtered}
        loading={loading}
        onDelete={handleDelete}
      />

      {/* =================================================
          UPLOAD MORE
      ================================================= */}

      <UploadMore />
    </div>
  );
}