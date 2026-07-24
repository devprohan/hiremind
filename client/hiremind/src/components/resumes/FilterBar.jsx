export default function FilterBar({
  filter,
  setFilter,
  sort,
  setSort,
}) {
  const filters = ["All", "Excellent", "Good", "Average", "Poor"];

  return (
    <div className="flex items-center justify-between">

      <div className="flex gap-3">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-xl px-4 py-2 transition ${
              filter === item
                ? "bg-violet-600 text-white"
                : "border bg-white hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-xl border px-4 py-2"
      >
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="Highest">Highest ATS</option>
        <option value="Lowest">Lowest ATS</option>
      </select>

    </div>
  );
}