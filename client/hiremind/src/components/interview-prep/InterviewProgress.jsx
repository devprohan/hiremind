const InterviewProgress = ({
  current,
  total,
}) => {
  const percentage =
    total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          Interview Progress
        </p>

        <span className="text-sm font-bold text-violet-600">
          {current + 1} / {total}
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-violet-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default InterviewProgress;