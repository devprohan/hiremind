import { motion } from "framer-motion";
import { Camera, Pencil } from "lucide-react";

const ProfileHeader = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 text-white shadow-xl"
    >
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 md:flex-row">
        <div className="relative">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-4xl font-bold">
            {profile?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <button className="absolute bottom-0 right-0 rounded-full bg-white p-2 text-violet-700 shadow-lg">
            <Camera size={18} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">{profile?.name}</h1>

          <p className="mt-2 text-violet-100">{profile?.role}</p>

          <p className="mt-1 text-sm text-violet-200">
            Member since {profile?.joined}
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-violet-700">
          <Pencil size={18} />
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;