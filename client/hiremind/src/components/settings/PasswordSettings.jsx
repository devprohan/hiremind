import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";
import axios from "axios";
import { changePassword } from "../../services/userService";

const PasswordSettings = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return alert("Please fill all fields");
    }

    if (formData.newPassword.length < 8) {
      return alert("Password must contain at least 8 characters");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  const PasswordInput = ({
    label,
    name,
    value,
    show,
    setShow,
  }) => (
    <div>
      <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
        <Lock size={18} />
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-violet-600"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {show ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-800">
        Change Password
      </h2>

      <div className="space-y-6">
        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          show={showCurrent}
          setShow={setShowCurrent}
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          show={showNew}
          setShow={setShowNew}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          show={showConfirm}
          setShow={setShowConfirm}
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-3 text-white transition hover:scale-105 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <Loader2
              className="animate-spin"
              size={18}
            />
            Updating...
          </>
        ) : (
          <>
            <Save size={18} />
            Update Password
          </>
        )}
      </button>
    </motion.form>
  );
};

export default PasswordSettings;