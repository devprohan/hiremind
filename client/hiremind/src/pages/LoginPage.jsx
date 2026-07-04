import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      const userData = {
        email: formData.email.trim(),
        password: formData.password,
      };

      const data = await loginUser(userData);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      console.log("Login Error:", error);

      setServerError(
        error.response?.data?.message ||
          "Login failed. Please try again."
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

      {/* Aurora Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-violet-300/40 blur-[120px]" />

        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-pink-300/40 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/30 blur-[120px]" />
      </div>

      {/* Login Card */}

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_25px_80px_rgba(124,58,237,0.15)] backdrop-blur-xl md:p-10">

        {/* Logo */}

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

        {/* Heading */}

        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to continue your career journey
          </p>
        </div>

        {/* Server Error */}

        {serverError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
          noValidate
        >
          {/* Email */}

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

          {/* Password */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-semibold text-violet-600 transition hover:text-pink-500"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`${inputClass(
                  "password"
                )} pr-16`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition hover:text-violet-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}

          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 accent-violet-600"
            />

            <label
              htmlFor="remember"
              className="text-sm text-slate-500"
            >
              Remember me
            </label>
          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="group w-full rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? "Logging in..." : "Login"}

              {!loading && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </span>
          </button>
        </form>

        {/* Divider */}

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Google */}

        <button
          type="button"
          className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition duration-300 hover:border-violet-200 hover:bg-violet-50"
        >
          Continue with Google
        </button>

        {/* Register */}

        <p className="mt-7 text-center text-sm text-slate-500">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-violet-600 transition hover:text-pink-500"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}