import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../../services/authService";

const items = [
  ["Dashboard", "/dashboard"],
  ["Upload Resume", "/dashboard/upload-resume"],
  ["My Resumes", "/dashboard/my-resume"],
  ["AI Job Match", "/dashboard/job-match"],
  ["Interview Prep", "/dashboard/interview-prep"],
  ["Profile", "/dashboard/profile"],
  ["Settings", "/dashboard/settings"],
];

export default function Sidebar() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      // Call backend logout
      await logoutUser();

      // Clear local storage
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      localStorage.removeItem("profile");
      sessionStorage.removeItem("profile");

      // Close modal
      setShowLogoutModal(false);

      // Go to login
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* SIDEBAR */}
      <aside
        className="
          sticky top-0 flex h-screen w-64 shrink-0 flex-col
          border-r bg-white p-5 text-slate-900
          transition-colors duration-300
          dark:border-slate-800
          dark:bg-slate-950 dark:text-white
        "
      >
        {/* Logo */}
        <div className="mb-8 px-4 text-xl font-black">
          Hire<span className="text-violet-600">Mind</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {items.map(([name, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/dashboard"}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-violet-100 font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="
            mt-auto w-full cursor-pointer rounded-xl
            border border-red-300 px-4 py-3
            text-left text-red-500
            transition hover:bg-red-50
            dark:border-red-900
            dark:hover:bg-red-950/30
          "
        >
          Logout
        </button>
      </aside>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div
          className="
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/40 px-4 backdrop-blur-sm
          "
        >
          <div
            className="
              w-full max-w-sm rounded-2xl
              border border-slate-200
              bg-white p-6 shadow-2xl
              dark:border-slate-700 dark:bg-slate-900
            "
          >
            {/* Icon */}
            <div
              className="
                mx-auto flex h-12 w-12 items-center
                justify-center rounded-full
                bg-red-100 text-xl
                dark:bg-red-900/30
              "
            >
              ⚠️
            </div>

            {/* Heading */}
            <h2
              className="
                mt-4 text-center text-xl font-bold
                text-slate-900 dark:text-white
              "
            >
              Logout?
            </h2>

            {/* Message */}
            <p
              className="
                mt-2 text-center text-sm
                text-slate-500 dark:text-slate-400
              "
            >
              Are you sure you want to logout from HireMind?
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              {/* Cancel */}
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                disabled={loggingOut}
                className="
                  flex-1 cursor-pointer rounded-xl
                  border border-slate-300 px-4 py-3
                  font-semibold text-slate-700
                  transition hover:bg-slate-100
                  disabled:cursor-not-allowed disabled:opacity-50
                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Cancel
              </button>

              {/* Confirm Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="
                  flex-1 cursor-pointer rounded-xl
                  bg-red-500 px-4 py-3
                  font-semibold text-white
                  transition hover:bg-red-600
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}