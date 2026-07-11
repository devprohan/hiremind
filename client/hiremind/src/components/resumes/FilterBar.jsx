import { Filter, LayoutGrid, List } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Left Side */}
      <div className="flex flex-wrap items-center gap-3">

        <button className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white shadow">
          All
        </button>

        <button className="rounded-full border px-5 py-2 text-sm text-slate-600 transition hover:bg-slate-100">
          Excellent
        </button>

        <button className="rounded-full border px-5 py-2 text-sm text-slate-600 transition hover:bg-slate-100">
          Good
        </button>

        <button className="rounded-full border px-5 py-2 text-sm text-slate-600 transition hover:bg-slate-100">
          Average
        </button>

        <button className="rounded-full border px-5 py-2 text-sm text-slate-600 transition hover:bg-slate-100">
          Poor
        </button>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        <button className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm hover:bg-slate-50">
          <Filter size={16} />
          Newest
        </button>

        <button className="rounded-xl border bg-violet-100 p-2 text-violet-600">
          <LayoutGrid size={18} />
        </button>

        <button className="rounded-xl border bg-white p-2 text-slate-600 hover:bg-slate-100">
          <List size={18} />
        </button>

      </div>

    </div>
  );
}