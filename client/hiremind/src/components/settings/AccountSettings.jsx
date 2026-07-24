import { motion } from "framer-motion";
import { User, Mail, Save } from "lucide-react";

const AccountSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Account Information
      </h2>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <User size={18} className="text-violet-600" />
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Ashwini Hedau"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Mail size={18} className="text-violet-600" />
            Email Address
          </label>

          <input
            type="email"
            defaultValue="ashwini@example.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <button
          className="mt-3 flex items-center gap-2 rounded-xl bg-gradient-to-r
          from-violet-600 via-purple-600 to-indigo-600 px-6 py-3
          font-medium text-white shadow-lg transition-all
          hover:scale-105 hover:shadow-xl"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default AccountSettings;