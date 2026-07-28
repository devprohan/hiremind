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
    emailNotifications: true,
    aiSuggestions: true,
    weeklyTips: false,
    darkMode: false,
  });

  const toggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    // Later:
    // await updateProfile({ preferences: updatedPreferences });
  };

  const options = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive important updates.",
      icon: Bell,
    },
    {
      key: "aiSuggestions",
      title: "AI Suggestions",
      description: "Enable AI-powered recommendations.",
      icon: Sparkles,
    },
    {
      key: "weeklyTips",
      title: "Weekly Resume Tips",
      description: "Receive weekly resume improvement tips.",
      icon: FileText,
    },
    {
      key: "darkMode",
      title: "Dark Mode",
      description: "Coming Soon",
      icon: Moon,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-2xl font-bold">
        Preferences
      </h2>

      <div className="space-y-6">
        {options.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-violet-100 p-3">
                  <Icon
                    className="text-violet-700"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggle(item.key)}
                className={`relative h-7 w-14 rounded-full transition ${
                  preferences[item.key]
                    ? "bg-violet-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
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