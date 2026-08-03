import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Sparkles,
  FileText,
  Moon,
  Sun,
  Check,
} from "lucide-react";

const DEFAULT_PREFERENCES = {
  emailNotifications: true,
  aiSuggestions: true,
  weeklyTips: false,
  darkMode: false,
};

const PreferenceSettings = () => {
  const [preferences, setPreferences] = useState(() => {
  try {
    const saved = localStorage.getItem("preferences");

    if (saved) {
      return {
        emailNotifications: true,
        aiSuggestions: true,
        weeklyTips: false,
        darkMode: false,
        ...JSON.parse(saved),
      };
    }
  } catch (error) {
    console.error("Failed to load preferences:", error);
  }

  return {
    emailNotifications: true,
    aiSuggestions: true,
    weeklyTips: false,
    darkMode: false,
  };
});

  const [saved, setSaved] = useState(false);

  // ==========================================
  // APPLY DARK MODE
  // ==========================================

  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [preferences.darkMode]);

  // ==========================================
  // TOGGLE PREFERENCE
  // ==========================================

  const toggle = (key) => {
  setPreferences((prev) => {
    const updatedPreferences = {
      ...prev,
      [key]: !prev[key],
    };

    // Save immediately
    localStorage.setItem(
      "preferences",
      JSON.stringify(updatedPreferences)
    );

    // Apply dark mode immediately
    if (key === "darkMode") {
      if (updatedPreferences.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    return updatedPreferences;
  });
};

  // ==========================================
  // SAVE SETTINGS
  // ==========================================

  const handleSave = () => {
    localStorage.setItem(
      "preferences",
      JSON.stringify(preferences)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);

    // Later when backend API is available:
    //
    // await updateProfile({
    //   preferences,
    // });
  };

  // ==========================================
  // OPTIONS
  // ==========================================

  const options = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive important account and resume updates.",
      icon: Bell,
    },
    {
      key: "aiSuggestions",
      title: "AI Suggestions",
      description:
        "Enable AI-powered resume recommendations.",
      icon: Sparkles,
    },
    {
      key: "weeklyTips",
      title: "Weekly Resume Tips",
      description:
        "Receive weekly resume improvement tips.",
      icon: FileText,
    },
    {
      key: "darkMode",
      title: "Dark Mode",
      description:
        "Switch between light and dark appearance.",
      icon: preferences.darkMode ? Sun : Moon,
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      {/* HEADER */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Preferences
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Customize your HireMind experience.
        </p>
      </div>

      {/* OPTIONS */}

      <div className="space-y-4">
        {options.map((item) => {
          const Icon = item.icon;
          const enabled =
            preferences[item.key];

          return (
            <motion.div
              key={item.key}
              whileHover={{
                y: -2,
              }}
              className="flex items-center justify-between gap-5 rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:shadow-sm dark:border-slate-700 dark:hover:border-violet-500"
            >
              {/* LEFT */}

              <div className="flex items-center gap-4">
                <div
                  className={`rounded-xl p-3 transition ${
                    enabled
                      ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* TOGGLE */}

              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                aria-label={`Toggle ${item.title}`}
                onClick={() =>
                  toggle(item.key)
                }
                className={`relative h-7 w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
                  enabled
                    ? "bg-violet-600"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <motion.span
                  animate={{
                    x: enabled ? 28 : 4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute left-0 top-1 h-5 w-5 rounded-full bg-white shadow"
                />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* SAVE BUTTON */}

      <div className="mt-8 flex items-center justify-end">
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleSave}
          className={`flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition ${
            saved
              ? "bg-emerald-500 shadow-emerald-100"
              : "bg-gradient-to-r from-violet-600 to-purple-600 shadow-violet-200 hover:shadow-xl"
          }`}
        >
          {saved ? (
            <>
              <Check size={18} />
              Saved
            </>
          ) : (
            "Save Preferences"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PreferenceSettings;