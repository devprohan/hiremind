import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Sparkles,
  FileText,
  Moon,
  Sun,
  Check,
  Loader2,
} from "lucide-react";

import {
  getPreferences,
  updatePreferences,
} from "../../services/userService";

const DEFAULT_PREFERENCES = {
  emailNotifications: true,
  aiSuggestions: true,
  weeklyTips: false,
  darkMode: false,
};

const PreferenceSettings = () => {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load preferences from database
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoading(true);

        const res = await getPreferences();

        if (res.preferences) {
          setPreferences({
            ...DEFAULT_PREFERENCES,
            ...res.preferences,
          });
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Apply dark mode
 useEffect(() => {
  if (loading) return;

  document.documentElement.classList.toggle(
    "dark",
    preferences.darkMode === true
  );
}, [preferences.darkMode, loading]);

  // Toggle
  const toggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save to database
  const handleSave = async () => {
  try {
    setSaving(true);
    setSaved(false);

    const res = await updatePreferences(preferences);

    if (res.preferences) {
      const updatedPreferences = {
        ...DEFAULT_PREFERENCES,
        ...res.preferences,
      };

      setPreferences(updatedPreferences);

      document.documentElement.classList.toggle(
        "dark",
        updatedPreferences.darkMode === true
      );
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  } catch (error) {
    console.error("Failed to save preferences:", error);

    alert(
      error.response?.data?.message ||
        "Failed to save preferences"
    );
  } finally {
    setSaving(false);
  }
};

  const options = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive important updates about your resume analysis and account.",
      icon: Bell,
    },
    {
      key: "aiSuggestions",
      title: "AI Suggestions",
      description:
        "Get AI-powered suggestions to improve your resume and job readiness.",
      icon: Sparkles,
    },
    {
      key: "weeklyTips",
      title: "Weekly Resume Tips",
      description:
        "Receive weekly tips to improve your resume and ATS score.",
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

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <Loader2
          className="animate-spin text-violet-600"
          size={28}
        />
        <span className="ml-3 text-slate-500 dark:text-slate-400">
          Loading preferences...
        </span>
      </div>
    );
  }

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
          const enabled = preferences[item.key];

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
                onClick={() => toggle(item.key)}
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
          type="button"
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleSave}
          disabled={saving}
          className={`flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60 ${
            saved
              ? "bg-emerald-500 shadow-emerald-100"
              : "bg-gradient-to-r from-violet-600 to-purple-600 shadow-violet-200 hover:shadow-xl"
          }`}
        >
          {saving ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Saving...
            </>
          ) : saved ? (
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