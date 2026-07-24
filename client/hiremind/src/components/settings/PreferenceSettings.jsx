import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Sparkles,
  FileText,
  Moon,
} from "lucide-react";

const PreferenceSettings = () => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    aiSuggestions: true,
    weeklyTips: false,
    darkMode: false,
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const options = [
    {
      key: "notifications",
      icon: Bell,
      title: "Email Notifications",
      description: "Receive important account updates via email.",
    },
    {
      key: "aiSuggestions",
      icon: Sparkles,
      title: "AI Suggestions",
      description: "Enable AI-powered resume recommendations.",
    },
    {
      key: "weeklyTips",
      icon: FileText,
      title: "Weekly Resume Tips",
      description: "Receive resume improvement tips every week.",
    },
    {
      key: "darkMode",
      icon: Moon,
      title: "Dark Mode",
      description: "Switch between light and dark theme.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Preferences
      </h2>

      <div className="space-y-5">
        {options.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-violet-100 p-3">
                  <Icon
                    size={20}
                    className="text-violet-700"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Toggle */}
              <button
                onClick={() =>
                  togglePreference(item.key)
                }
                className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
                  preferences[item.key]
                    ? "bg-violet-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
                    preferences[item.key]
                      ? "left-8"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PreferenceSettings;