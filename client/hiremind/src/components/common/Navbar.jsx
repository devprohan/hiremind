import { useState } from "react";
import { Moon, Sun } from "lucide-react";

import { getStoredTheme, applyTheme } from "../../utils/theme";

const Navbar = () => {
  const [theme, setTheme] = useState(getStoredTheme());

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Apply theme to entire application
    applyTheme(newTheme);

    // Update navbar icon
    setTheme(newTheme);
  };

  return (
    <nav
      className="
        relative z-50
        border-b border-slate-200
        bg-white/90
        backdrop-blur-xl

        dark:border-slate-800
        dark:bg-slate-950/90
      "
    >
      <div
        className="
          mx-auto flex h-20 max-w-7xl
          items-center justify-between
          px-6
        "
      >
        {/* ================= LOGO ================= */}

        <a href="/" className="text-2xl font-black tracking-tight">
          <span className="text-slate-900 dark:text-white">Hire</span>

          <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            Mind
          </span>
        </a>

        {/* ================= NAVIGATION ================= */}

        <div className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="
              text-sm font-medium
              text-slate-500
              transition
              hover:text-violet-600

              dark:text-slate-400
              dark:hover:text-violet-400
            "
          >
            Features
          </a>

          <a
            href="#how"
            className="
              text-sm font-medium
              text-slate-500
              transition
              hover:text-violet-600

              dark:text-slate-400
              dark:hover:text-violet-400
            "
          >
            How It Works
          </a>

          <a
            href="#about"
            className="
              text-sm font-medium
              text-slate-500
              transition
              hover:text-violet-600

              dark:text-slate-400
              dark:hover:text-violet-400
            "
          >
            About
          </a>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center gap-4">
          {/* LOGIN */}

          <a
            href="/login"
            className="
              hidden
              cursor-pointer
              text-sm font-semibold
              text-slate-700
              transition
              hover:text-violet-600

              dark:text-slate-200
              dark:hover:text-violet-400

              sm:block
            "
          >
            Login
          </a>

          {/* GET STARTED */}

          <a
            href="/register"
            className="
              cursor-pointer
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-pink-500
              px-5 py-2.5
              text-sm font-semibold
              text-white
              shadow-lg
              transition
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >
            Get Started
          </a>

          {/* ================= THEME TOGGLE ================= */}

          <button
            type="button"
            onClick={handleThemeToggle}
            className="
    flex h-11 w-11
    cursor-pointer
    items-center justify-center
    rounded-xl
    border border-slate-200
    bg-white
    text-slate-700
    transition

    hover:bg-slate-100

    dark:border-slate-700
    dark:bg-slate-900
    dark:text-yellow-400
    dark:hover:bg-slate-800
  "
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
