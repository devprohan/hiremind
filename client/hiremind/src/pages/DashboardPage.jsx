import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Files,
  BriefcaseBusiness,
  MessageSquareText,
  User,
  Settings,
  LogOut,
  Bell,
  FileText,
  TrendingUp,
  ScanLine,
  Target,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/dashboard",
  },
  {
    label: "Upload Resume",
    icon: Upload,
    route: "/upload-resume",
  },
  {
    label: "My Resumes",
    icon: Files,
    route: "/my-resumes",
  },
  {
    label: "Job Match",
    icon: BriefcaseBusiness,
    route: "/job-match",
  },
  {
    label: "Interview Prep",
    icon: MessageSquareText,
    route: "/interview-prep",
  },
  {
    label: "Profile",
    icon: User,
    route: "/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    route: "/settings",
  },
];

const stats = [
  {
    title: "Total Resumes",
    value: "12",
    icon: FileText,
    iconStyle: "bg-violet-50 text-violet-600",
  },
  {
    title: "Highest ATS Score",
    value: "92",
    icon: Target,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Average ATS Score",
    value: "78",
    icon: TrendingUp,
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Analyses Done",
    value: "15",
    icon: ScanLine,
    iconStyle: "bg-pink-50 text-pink-600",
  },
];

const trend = [
  { label: "May 1", value: 35 },
  { label: "May 5", value: 58 },
  { label: "May 9", value: 47 },
  { label: "May 13", value: 70 },
  { label: "May 17", value: 59 },
  { label: "May 21", value: 88 },
  { label: "May 25", value: 82 },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch {
    user = null;
  }

  const firstName =
    user?.fullName?.split(" ")[0] || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900">
      {/* Mobile overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[245px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}

        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 font-black text-white shadow-lg shadow-violet-200">
              H
            </div>

            <span className="text-xl font-black tracking-tight">
              Hire
              <span className="text-violet-600">
                Mind
              </span>
            </span>
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-1 px-4 py-6">
          {sidebarItems.map(
            ({ label, icon: Icon, route }) => {
              const active =
                route === "/dashboard";

              return (
                <button
                  key={label}
                  onClick={() => {
                    navigate(route);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />

                  {label}
                </button>
              );
            }
          )}
        </nav>

        {/* Logout */}

        <div className="border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={18} />

            Logout
          </button>
        </div>
      </aside>

      {/* Main */}

      <div className="lg:ml-[245px]">
        {/* Topbar */}

        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-800">
                Dashboard
              </p>

              <p className="text-xs text-slate-400">
                Resume performance overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100">
              <Bell size={19} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-pink-500" />
            </button>

            <div className="h-8 w-px bg-slate-200" />

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-bold text-white">
                {firstName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.fullName || firstName}
                </p>

                <p className="max-w-[170px] truncate text-xs text-slate-400">
                  {user?.email || "HireMind User"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}

        <main className="px-6 py-8 md:px-8 xl:px-10">
          <div className="mx-auto max-w-[1450px]">
            {/* Welcome */}

            <section>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Welcome back, {firstName} 👋
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Here's what's happening with your
                resumes today.
              </p>
            </section>

            {/* Stats */}

            <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map(
                ({
                  title,
                  value,
                  icon: Icon,
                  iconStyle,
                }) => (
                  <div
                    key={title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`grid h-11 w-11 place-items-center rounded-xl ${iconStyle}`}
                      >
                        <Icon size={20} />
                      </div>

                      <ChevronRight
                        size={18}
                        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-500"
                      />
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                      {title}
                    </p>

                    <p className="mt-2 text-4xl font-black tracking-tight text-slate-900">
                      {value}
                    </p>
                  </div>
                )
              )}
            </section>

            {/* Chart and resume */}

            <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
              {/* ATS Chart */}

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      ATS Score Trend
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Your resume score performance
                    </p>
                  </div>

                  <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 outline-none">
                    <option>Last 30 days</option>

                    <option>Last 7 days</option>
                  </select>
                </div>

                {/* Chart */}

                <div className="mt-8">
                  <div className="relative h-[280px]">
                    {/* Horizontal lines */}

                    <div className="absolute inset-0 flex flex-col justify-between pb-8">
                      {[100, 75, 50, 25, 0].map(
                        (value) => (
                          <div
                            key={value}
                            className="relative border-t border-dashed border-slate-100"
                          >
                            <span className="absolute -top-2.5 left-0 bg-white pr-3 text-[10px] text-slate-400">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Bars */}

                    <div className="absolute inset-0 flex items-end gap-4 pb-8 pl-9 md:gap-7">
                      {trend.map(
                        ({ label, value }) => (
                          <div
                            key={label}
                            className="group flex h-full flex-1 flex-col justify-end"
                          >
                            <div className="relative flex flex-1 items-end">
                              <div
                                className="relative w-full rounded-t-lg bg-linear-to-t from-violet-600 to-pink-400 transition duration-300 group-hover:opacity-80"
                                style={{
                                  height: `${value}%`,
                                }}
                              >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                                  {value}
                                </div>
                              </div>
                            </div>

                            <p className="mt-3 text-center text-[10px] text-slate-400">
                              {label}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Resume */}

              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Resume
                  </h2>

                  <button
                    onClick={() =>
                      navigate("/my-resumes")
                    }
                    className="text-xs font-semibold text-violet-600"
                  >
                    View all
                  </button>
                </div>

                <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        Resume_SDE.pdf
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Analyzed May 29, 2026
                      </p>
                    </div>
                  </div>

                  <div className="my-7 border-t border-slate-200" />

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">
                        ATS Score
                      </p>

                      <p className="mt-1 text-4xl font-black text-emerald-500">
                        92
                      </p>
                    </div>

                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-600">
                      EXCELLENT
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        "/resume-analysis"
                      )
                    }
                    className="mt-6 w-full rounded-lg bg-violet-600 py-3 text-xs font-semibold text-white transition hover:bg-violet-700"
                  >
                    View Analysis
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}