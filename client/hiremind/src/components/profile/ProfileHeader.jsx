import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Mail,
  Award,
} from "lucide-react";

import {
  getCurrentUser,
  getDashboardStats,
} from "../../services/profileService";

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PROFILE
  // =========================

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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="animate-pulse">

          <div
            className="
              h-24
              w-24
              rounded-full
              bg-slate-300

              dark:bg-slate-700
            "
          />

          <div
            className="
              mt-5
              h-6
              w-52
              rounded
              bg-slate-300

              dark:bg-slate-700
            "
          />

          <div
            className="
              mt-3
              h-4
              w-80
              rounded
              bg-slate-200

              dark:bg-slate-800
            "
          />

        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-indigo-600
        p-8
        text-white
        shadow-xl
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          gap-6
          md:flex-row
        "
      >

        {/* =========================
            AVATAR
        ========================= */}

        <div
          className="
            flex
            h-28
            w-28
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-full
            bg-white/20
            text-5xl
            font-bold
            ring-4
            ring-white/10
          "
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="
                h-full
                w-full
                rounded-full
                object-cover
              "
            />
          ) : (
            <User size={60} />
          )}
        </div>

        {/* =========================
            USER DETAILS
        ========================= */}

        <div className="flex-1">

          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            {user?.fullName || "User"}
          </h1>

          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-5
              text-white/90
            "
          >

            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap size={18} />
              <span>
                {user?.college || "College"}
              </span>
            </div>

          </div>

          <p
            className="
              mt-3
              text-white/80
            "
          >
            {user?.branch || "Branch"}{" "}
            •{" "}
            {user?.graduationYear || "Graduation Year"}
          </p>

        </div>

        {/* =========================
            ATS CARD
        ========================= */}

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          className="
            w-full
            rounded-2xl
            border
            border-white/20
            bg-white
            p-6
            text-center
            text-slate-800
            shadow-lg

            dark:border-slate-600
            dark:bg-slate-800
            dark:text-slate-100
          "
        >

          <Award
            className="
              mx-auto
              text-yellow-500
            "
            size={34}
          />

          <h3
            className="
              mt-2
              text-lg
              font-semibold
              text-slate-800

              dark:text-slate-100
            "
          >
            Highest ATS
          </h3>

          <p
            className="
              mt-2
              text-4xl
              font-bold
              text-violet-600

              dark:text-violet-400
            "
          >
            {stats?.highestATS ?? 0}
          </p>

          <span
            className="
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Resume Score
          </span>

        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProfileHeader;