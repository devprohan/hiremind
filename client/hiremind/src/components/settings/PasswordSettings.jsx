import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";

import { changePassword } from "../../services/userService";

const PasswordSettings = () => {
  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================

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
      return alert(
        "Password must contain at least 8 characters"
      );
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return alert("Passwords do not match");
    }

    try {
      setSaving(true);

      const res = await changePassword({
        currentPassword:
          formData.currentPassword,
        newPassword: formData.newPassword,
      });

      alert(
        res.message ||
          "Password changed successfully"
      );

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

  // =========================
  // PASSWORD INPUT
  // =========================

  const PasswordInput = ({
    label,
    name,
    value,
    show,
    setShow,
  }) => (
    <div>
      <label
        className="
          mb-2
          block
          font-semibold
          text-slate-700

          dark:text-slate-200
        "
      >
        {label}
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            pr-12
            text-slate-800
            outline-none
            transition

            focus:border-violet-600
            focus:ring-4
            focus:ring-violet-100

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-100
            dark:focus:border-violet-500
            dark:focus:ring-violet-500/20
          "
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            cursor-pointer
            text-slate-500
            transition
            hover:text-violet-600

            dark:text-slate-400
            dark:hover:text-violet-400
          "
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
          text-2xl
          font-bold
          text-slate-800

          dark:text-white
        "
      >
        Change Password
      </h2>

      <p
        className="
          mt-1
          text-sm
          text-slate-500

          dark:text-slate-400
        "
      >
        Update your password to keep your
        account secure.
      </p>

      {/* =========================
          PASSWORD FIELDS
      ========================= */}

      <div className="mt-6 space-y-6">

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

      {/* =========================
          UPDATE BUTTON
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