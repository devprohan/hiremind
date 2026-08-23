export default function FilterBar({
  filter,
  setFilter,
  sort,
  setSort,
}) {
  const filters = [
    "All",
    "Excellent",
    "Good",
    "Average",
    "Poor",
  ];

  return (
    <div
      className="
        flex
        flex-col
        gap-4

        transition-colors
        duration-300

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* =========================
          FILTER BUTTONS
      ========================== */}

      <div className="flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200

              ${
                filter === item
                  ? `
                    bg-violet-600
                    text-white
                    shadow-sm

                    hover:bg-violet-700
                  `
                  : `
                    border
                    border-slate-200
                    bg-white
                    text-slate-700

                    hover:bg-slate-100

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-slate-300
                    dark:hover:bg-slate-800
                  `
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      {/* =========================
          SORT
      ========================== */}

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
          cursor-pointer
          rounded-xl

          border
          border-slate-200

          bg-white

          px-4
          py-2

          text-sm
          font-medium
          text-slate-700

          outline-none

          transition

          focus:border-violet-500
          focus:ring-4
          focus:ring-violet-100

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-300
          dark:focus:border-violet-500
          dark:focus:ring-violet-500/20
        "
      >
        <option value="Newest">
          Newest
        </option>

        <option value="Oldest">
          Oldest
        </option>

        <option value="Highest">
          Highest ATS
        </option>

        <option value="Lowest">
          Lowest ATS
        </option>
      </select>
    </div>
  );
}