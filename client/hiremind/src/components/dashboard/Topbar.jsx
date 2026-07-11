import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white px-8">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search resumes..."
          className="w-80 rounded-xl bg-slate-50 py-3 pl-11 pr-4 outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative grid h-11 w-11 place-items-center rounded-xl border border-slate-200">
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500" />
        </button>

        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 font-bold text-white">
          R
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">Rohan</p>
          <p className="text-xs text-slate-400">Student</p>
        </div>
      </div>
    </header>
  );
};

export default Topbar;