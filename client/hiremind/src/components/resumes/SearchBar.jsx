import { Search, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SearchBar({ search, setSearch }) {
    const navigate = useNavigate();
   
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Search Box */}
      <div className="relative w-full md:w-[420px]">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

         <input
          type="text"
          placeholder="Search resumes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

      </div>

      {/* Upload Button */}

      <button className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-violet-700 hover:shadow-lg"
       onClick={() => navigate("/dashboard/upload-resume")}>

        <Upload size={18} />

        Upload Resume

      </button>

    </div>
  );
}