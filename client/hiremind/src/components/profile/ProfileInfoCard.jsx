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

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-slate-300"></div>
          <div className="h-4 w-full rounded bg-slate-200"></div>
          <div className="h-4 w-5/6 rounded bg-slate-200"></div>
          <div className="h-4 w-4/6 rounded bg-slate-200"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white p-6 shadow-lg"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Profile Information
      </h2>

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

      {/* Bio */}
      <div className="mt-8">
        <div className="mb-2 flex items-center gap-2">
          <FileText size={18} className="text-violet-600" />
          <h3 className="font-semibold text-slate-700">Bio</h3>
        </div>

        <p className="rounded-xl bg-slate-50 p-4 text-slate-600">
          {user?.bio || "No bio added yet."}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <Code2 size={18} className="text-violet-600" />
          <h3 className="font-semibold text-slate-700">
            Skills
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {user?.skills?.length ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-slate-500">
              No skills added.
            </p>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-8 flex flex-wrap gap-4">
        {user?.github && (
          <a
            href={user.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 transition hover:bg-slate-200"
          >
            <FaGithub size={20} />
            GitHub
          </a>
        )}

 

{user?.linkedin && (
  <a
    href={user.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-3 text-blue-700 transition hover:bg-blue-200"
  >
    <FaLinkedin size={20} />
    LinkedIn
  </a>
)}
      </div>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-slate-200 p-4">
    <div className="mb-2 flex items-center gap-2 text-violet-600">
      {icon}
      <span className="font-medium">{label}</span>
    </div>

    <p className="text-lg font-semibold text-slate-800">
      {value}
    </p>
  </div>
);

export default ProfileInfoCard;