import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName =
        "Full name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");
    setSuccessMessage("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      const userData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const data = await registerUser(userData);

      setSuccessMessage(
        data.message || "Account created successfully"
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (fieldName) => {
    return `w-full rounded-xl border bg-white px-4 py-3
    text-slate-800 outline-none transition duration-300
    placeholder:text-slate-400
    ${
      errors[fieldName]
        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : "border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
    }`;
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#faf9ff] px-6 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-violet-300/40 blur-[120px]" />

        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-pink-300/40 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/30 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_25px_80px_rgba(124,58,237,0.15)] backdrop-blur-xl md:p-10">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2"
        >
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 text-xl font-black text-white shadow-lg shadow-violet-200">
            H
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            Hire
            <span className="text-violet-600">
              Mind
            </span>
          </h2>
        </Link>

        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Start improving your resume with AI
          </p>
        </div>

        {serverError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
          noValidate
        >
            <div className="flex justify-center flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass("fullName")}
            />

            {errors.fullName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass("email")}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={inputClass("password")}
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 ">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={inputClass(
                "confirmPassword"
              )}
            />

            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-amber-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group mt-2 w-full rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-pink-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2 py-2">
              {loading
                ? "Creating Account..."
                : "Create Account"}

              {!loading && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </span>
          </button>
          </div>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            className="font-semibold text-violet-600 transition hover:text-pink-500"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}