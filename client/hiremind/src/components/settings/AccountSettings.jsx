import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Building2,
  Award,
  FileText,
  Save,
  Loader2,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import {
  getCurrentUser,
  updateProfile,
} from "../../services/userService";

const AccountSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    college: "",
    branch: "",
    graduationYear: "",
    cgpa: "",
    github: "",
    linkedin: "",
    bio: "",
  });

  // =========================
  // Fetch User
  // =========================

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();

      const user = res.user;

      setFormData({
        fullName: user.fullName || "",
        college: user.college || "",
        branch: user.branch || "",
        graduationYear: user.graduationYear || "",
        cgpa: user.cgpa || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        bio: user.bio || "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Handle Change
  // =========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // Save Profile
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(formData);

      alert("Profile updated successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2
          className="animate-spin text-violet-600"
          size={40}
        />
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
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
      {/* =========================
          HEADER
      ========================= */}

      <h2
        className="
          mb-8
          text-2xl
          font-bold
          text-slate-900

          dark:text-white
        "
      >
        Account Information
      </h2>

      {/* =========================
          INPUTS
      ========================= */}

      <div className="grid gap-6 md:grid-cols-2">

        <InputField
          icon={User}
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <InputField
          icon={Building2}
          label="College"
          name="college"
          value={formData.college}
          onChange={handleChange}
        />

        <InputField
          icon={GraduationCap}
          label="Branch"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
        />

        <InputField
          icon={Award}
          label="Graduation Year"
          name="graduationYear"
          type="number"
          value={formData.graduationYear}
          onChange={handleChange}
        />

        <InputField
          icon={Award}
          label="CGPA"
          name="cgpa"
          type="number"
          value={formData.cgpa}
          onChange={handleChange}
        />

        <InputField
          icon={FaGithub}
          label="GitHub"
          name="github"
          value={formData.github}
          onChange={handleChange}
        />

        <InputField
          icon={FaLinkedin}
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
        />

      </div>

      {/* =========================
          BIO
      ========================= */}

      <div className="mt-6">

        <label
          className="
            mb-2
            flex
            items-center
            gap-2
            font-semibold
            text-slate-700

            dark:text-slate-200
          "
        >
          <FileText size={18} />
          Bio
        </label>

        <textarea
          rows={5}
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us a little about yourself..."
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            p-4
            text-slate-800
            outline-none
            transition

            placeholder:text-slate-400

            focus:border-violet-600
            focus:ring-4
            focus:ring-violet-100

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-100
            dark:placeholder:text-slate-500
            dark:focus:border-violet-500
            dark:focus:ring-violet-500/20
          "
        />

      </div>

      {/* =========================
          SAVE BUTTON
      ========================= */}

      <button
        type="submit"
        disabled={saving}
        className="
          mt-8
          flex
          cursor-pointer
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          via-purple-600
          to-indigo-600
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition
          hover:scale-105
          hover:shadow-xl
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:scale-100
        "
      >
        {saving ? (
          <>
            <Loader2
              className="animate-spin"
              size={18}
            />
            Saving...
          </>
        ) : (
          <>
            <Save size={18} />
            Save Changes
          </>
        )}
      </button>
    </motion.form>
  );
};

// =========================
// Reusable Input Field
// =========================

function InputField({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>

      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          font-semibold
          text-slate-700

          dark:text-slate-200
        "
      >
        <Icon size={18} />
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-800
          outline-none
          transition

          placeholder:text-slate-400

          focus:border-violet-600
          focus:ring-4
          focus:ring-violet-100

          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-100
          dark:placeholder:text-slate-500
          dark:focus:border-violet-500
          dark:focus:ring-violet-500/20
        "
      />

    </div>
  );
}

export default AccountSettings;