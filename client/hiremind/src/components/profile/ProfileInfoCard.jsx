import { motion } from "framer-motion";
import { Mail, User, Briefcase, Calendar } from "lucide-react";

const ProfileInfoCard = ({ profile }) => {
  const info = [
    {
      icon: User,
      label: "Full Name",
      value: profile?.name || "Not Available",
    },
    {
      icon: Mail,
      label: "Email",
      value: profile?.email || "Not Available",
    },
    {
      icon: Briefcase,
      label: "Role",
      value: profile?.role || "Not Available",
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: profile?.joined || "Not Available",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Personal Information
      </h2>

      <div className="space-y-5">
        {info.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
            >
              <div className="rounded-xl bg-violet-100 p-3">
                <Icon size={20} className="text-violet-700" />
              </div>

              <div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="font-semibold text-slate-800">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProfileInfoCard;