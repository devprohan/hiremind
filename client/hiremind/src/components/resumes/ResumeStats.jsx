import {
  FileText,
  Star,
  Trophy,
} from "lucide-react";

const stats = [
  {
    title: "Total Resumes",
    value: "12",
    subtitle: "All uploaded resumes",
    icon: FileText,
    bg: "bg-violet-100",
    color: "text-violet-600",
  },
  {
    title: "Average ATS Score",
    value: "84",
    subtitle: "Across all resumes",
    icon: Star,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    title: "Highest ATS Score",
    value: "92",
    subtitle: "Your best performance",
    icon: Trophy,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
];

export default function ResumeStats() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-5">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon
                  size={30}
                  className={item.color}
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-1 text-4xl font-black text-slate-900">
                  {item.value}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}