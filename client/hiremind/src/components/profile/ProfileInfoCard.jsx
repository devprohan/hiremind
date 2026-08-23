import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  Calendar,
  BookOpen,
  Code2,
  FileText,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { getCurrentUser } from "../../services/profileService";

const ProfileInfoCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.user);
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
          border border-slate-200
          bg-white
          p-6
          shadow

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="animate-pulse space-y-4">

          <div
            className="
              h-6
              w-48
              rounded
              bg-slate-300
              dark:bg-slate-700
            "
          />

          <div
            className="
              h-4
              w-full
              rounded
              bg-slate-200
              dark:bg-slate-800
            "
          />

          <div
            className="
              h-4
              w-5/6
              rounded
              bg-slate-200
              dark:bg-slate-800
            "
          />

          <div
            className="
              h-4
              w-4/6
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
        rounded-3xl
        border border-slate-200
        bg-white
        p-6
        shadow-lg

        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      {/* =========================
          TITLE
      ========================= */}

      <h2
        className="
          mb-6
          text-2xl
          font-bold
          text-slate-800

          dark:text-white
        "
      >
        Profile Information
      </h2>

      {/* =========================
          INFORMATION
      ========================= */}

      <div className="grid gap-5 md:grid-cols-2">

        <InfoItem
          icon={<Building2 size={18} />}
          label="College"
          value={user?.college || "Not Added"}
        />

        <InfoItem
          icon={<BookOpen size={18} />}
          label="Branch"
          value={user?.branch || "Not Added"}
        />

        <InfoItem
          icon={<Calendar size={18} />}
          label="Graduation"
          value={user?.graduationYear || "Not Added"}
        />

        <InfoItem
          icon={<GraduationCap size={18} />}
          label="CGPA"
          value={user?.cgpa || "Not Added"}
        />

      </div>

      {/* =========================
          BIO
      ========================= */}

      <div className="mt-8">

        <div className="mb-2 flex items-center gap-2">

          <FileText
            size={18}
            className="text-violet-600 dark:text-violet-400"
          />

          <h3
            className="
              font-semibold
              text-slate-700

              dark:text-slate-200
            "
          >
            Bio
          </h3>

        </div>

        <p
          className="
            rounded-xl
            bg-slate-50
            p-4
            text-slate-600

            dark:bg-slate-800
            dark:text-slate-300
          "
        >
          {user?.bio || "No bio added yet."}
        </p>

      </div>

      {/* =========================
          SKILLS
      ========================= */}

      <div className="mt-8">

        <div className="mb-3 flex items-center gap-2">

          <Code2
            size={18}
            className="text-violet-600 dark:text-violet-400"
          />

          <h3
            className="
              font-semibold
              text-slate-700

              dark:text-slate-200
            "
          >
            Skills
          </h3>

        </div>

        <div className="flex flex-wrap gap-2">

          {user?.skills?.length ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="
                  rounded-full
                  bg-violet-100
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-violet-700

                  dark:bg-violet-500/15
                  dark:text-violet-300
                "
              >
                {skill}
              </span>
            ))
          ) : (
            <p
              className="
                text-slate-500
                dark:text-slate-400
              "
            >
              No skills added.
            </p>
          )}

        </div>

      </div>

      {/* =========================
          SOCIAL LINKS
      ========================= */}

      <div className="mt-8 flex flex-wrap gap-4">

        {/* GitHub */}

        {user?.github && (
          <a
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-slate-100
              px-4
              py-3
              text-slate-700
              transition
              hover:bg-slate-200

              dark:bg-slate-800
              dark:text-slate-200
              dark:hover:bg-slate-700
            "
          >
            <FaGithub size={20} />

            GitHub
          </a>
        )}

        {/* LinkedIn */}

        {user?.linkedin && (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-100
              px-4
              py-3
              text-blue-700
              transition
              hover:bg-blue-200

              dark:bg-blue-500/15
              dark:text-blue-300
              dark:hover:bg-blue-500/25
            "
          >
            <FaLinkedin size={20} />

            LinkedIn
          </a>
        )}

      </div>

    </motion.div>
  );
};


// =========================
// INFO ITEM
// =========================

const InfoItem = ({
  icon,
  label,
  value,
}) => (
  <div
    className="
      rounded-2xl
      border
      border-slate-200
      p-4

      dark:border-slate-700
      dark:bg-slate-800/50
    "
  >

    <div
      className="
        mb-2
        flex
        items-center
        gap-2
        text-violet-600

        dark:text-violet-400
      "
    >
      {icon}

      <span
        className="
          font-medium
          text-slate-700

          dark:text-slate-300
        "
      >
        {label}
      </span>
    </div>

    <p
      className="
        text-lg
        font-semibold
        text-slate-800

        dark:text-white
      "
    >
      {value}
    </p>

  </div>
);

export default ProfileInfoCard;