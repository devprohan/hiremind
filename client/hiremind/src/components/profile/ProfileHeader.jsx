import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Mail, Award } from "lucide-react";
import { getCurrentUser, getDashboardStats } from "../../services/profileService";

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const [userRes, statsRes] = await Promise.all([
        getCurrentUser(),
        getDashboardStats(),
      ]);

      setUser(userRes.user);
      setStats(statsRes.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow">
        <div className="animate-pulse">
          <div className="h-24 w-24 rounded-full bg-slate-300"></div>
          <div className="mt-5 h-6 w-52 rounded bg-slate-300"></div>
          <div className="mt-3 h-4 w-80 rounded bg-slate-200"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 text-white shadow-xl"
    >
      <div className="flex flex-col items-center gap-6 md:flex-row">
        {/* Avatar */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 text-5xl font-bold">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User size={60} />
          )}
        </div>

        {/* User Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {user?.fullName || "User"}
          </h1>

          <div className="mt-3 flex flex-wrap gap-5 text-white/90">
            <div className="flex items-center gap-2">
              <Mail size={18} />
              {user?.email}
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap size={18} />
              {user?.college || "College"}
            </div>
          </div>

          <p className="mt-3 text-white/80">
            {user?.branch} • {user?.graduationYear}
          </p>
        </div>

        {/* ATS Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-2xl bg-white p-6 text-center text-slate-800 shadow-lg"
        >
          <Award
            className="mx-auto text-yellow-500"
            size={34}
          />

          <h3 className="mt-2 text-lg font-semibold">
            Highest ATS
          </h3>

          <p className="mt-2 text-4xl font-bold text-violet-600">
            {stats?.highestATS ?? 0}
          </p>

          <span className="text-sm text-slate-500">
            Resume Score
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;