import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Save } from "lucide-react";

const PasswordSettings = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Change Password
      </h2>

      <div className="space-y-5">

        {/* Current Password */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Lock size={18} className="text-violet-600" />
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Lock size={18} className="text-violet-600" />
            New Password
          </label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Lock size={18} className="text-violet-600" />
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          className="mt-3 flex items-center gap-2 rounded-xl bg-gradient-to-r
          from-violet-600 via-purple-600 to-indigo-600
          px-6 py-3 font-medium text-white shadow-lg transition-all
          hover:scale-105 hover:shadow-xl"
        >
          <Save size={18} />
          Update Password
        </button>

      </div>
    </motion.div>
  );
};

export default PasswordSettings;