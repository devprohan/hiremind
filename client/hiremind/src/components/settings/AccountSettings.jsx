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


import { getCurrentUser, updateProfile } from "../../services/userService";

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(formData);

      alert("Profile updated successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200"
    >
      <h2 className="mb-8 text-2xl font-bold">
        Account Information
      </h2>

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

      <div className="mt-6">
        <label className="mb-2 flex items-center gap-2 font-semibold">
          <FileText size={18} />
          Bio
        </label>

        <textarea
          rows={5}
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-violet-600"
        />
      </div>

      <button
        disabled={saving}
        className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-3 text-white transition hover:scale-105 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <Loader2 className="animate-spin" size={18} />
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
      <label className="mb-2 flex items-center gap-2 font-semibold">
        <Icon size={18} />
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600"
      />
    </div>
  );
}

export default AccountSettings;