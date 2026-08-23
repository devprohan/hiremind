import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  loginUser,
  googleLogin,
} from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

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
      newErrors.password =
        "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const userData = {
        email: formData.email.trim(),
        password: formData.password,
        rememberMe: formData.rememberMe,
      };

      await loginUser(userData);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );

      setServerError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INPUT STYLE
  // =========================

  const inputClass = (fieldName) => {
    const hasError = !!errors[fieldName];

    return `
      w-full
      rounded-xl
      border
      px-4
      py-3
      outline-none
      transition-all
      duration-300

      bg-white
      text-slate-800
      placeholder:text-slate-400

      dark:bg-slate-800
      dark:text-white
      dark:placeholder:text-slate-500

      ${
        hasError
          ? `
            border-red-400
            focus:border-red-500
            focus:ring-4
            focus:ring-red-100

            dark:border-red-500
            dark:focus:ring-red-950
          `
          : `
            border-slate-200
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-100

            dark:border-slate-700
            dark:focus:border-violet-500
            dark:focus:ring-violet-950
          `
      }
    `;
  };

  return (
    <div
      className="
        relative
        grid
        min-h-screen
        place-items-center
        overflow-hidden

        bg-slate-50

        px-6
        py-12

        transition-colors
        duration-300

        dark:bg-slate-950
      "
    >
      {/* ==========================================
          AURORA BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            -left-24
            -top-24
            h-96
            w-96
            rounded-full
            bg-violet-300/40
            blur-[120px]

            dark:bg-violet-700/20
          "
        />

        <div
          className="
            absolute
            -right-20
            top-20
            h-96
            w-96
            rounded-full
            bg-pink-300/40
            blur-[120px]

            dark:bg-pink-700/20
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-1/3
            h-80
            w-80
            rounded-full
            bg-cyan-200/30
            blur-[120px]

            dark:bg-cyan-700/10
          "
        />

      </div>

      {/* ==========================================
          LOGIN CARD
      ========================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md

          rounded-[32px]

          border
          border-white/70

          bg-white/80

          p-8

          shadow-[0_25px_80px_rgba(124,58,237,0.15)]

          backdrop-blur-xl

          transition-all
          duration-300

          dark:border-slate-700/70
          dark:bg-slate-900/90
          dark:shadow-[0_25px_80px_rgba(0,0,0,0.45)]

          md:p-10
        "
      >
        {/* ==========================================
            LOGO
        ========================================== */}

        <Link
          to="/"
          className="
            mb-8
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <div
            className="
              grid
              h-11
              w-11
              place-items-center
              rounded-2xl

              bg-gradient-to-br
              from-violet-600
              to-pink-500

              text-xl
              font-black
              text-white

              shadow-lg
              shadow-violet-200

              dark:shadow-violet-950/40
            "
          >
            H
          </div>

          <h2
            className="
              text-2xl
              font-black

              text-slate-900

              dark:text-white
            "
          >
            Hire
            <span
              className="
                text-violet-600
                dark:text-violet-400
              "
            >
              Mind
            </span>
          </h2>
        </Link>

        {/* ==========================================
            HEADING
        ========================================== */}

        <div className="text-center">

          <h1
            className="
              text-3xl
              font-black
              tracking-tight

              text-slate-900

              dark:text-white
            "
          >
            Welcome back 👋
          </h1>

          <p
            className="
              mt-2
              text-sm

              text-slate-500

              dark:text-slate-400
            "
          >
            Login to continue your career journey
          </p>

        </div>

        {/* ==========================================
            SERVER ERROR
        ========================================== */}

        {serverError && (
          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600

              dark:border-red-900/60
              dark:bg-red-950/40
              dark:text-red-400
            "
          >
            {serverError}
          </div>
        )}

        {/* ==========================================
            FORM
        ========================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
          noValidate
        >
          {/* EMAIL */}

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-semibold

                text-slate-700

                dark:text-slate-200
              "
            >
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
              <p
                className="
                  mt-2
                  text-sm
                  text-red-500

                  dark:text-red-400
                "
              >
                {errors.email}
              </p>
            )}

          </div>

          {/* PASSWORD */}

          <div>

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >

              <label
                className="
                  text-sm
                  font-semibold

                  text-slate-700

                  dark:text-slate-200
                "
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="
                  text-xs
                  font-semibold
                  text-violet-600
                  transition

                  hover:text-pink-500

                  dark:text-violet-400
                "
              >
                Forgot password?
              </Link>

            </div>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
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
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2

                  cursor-pointer

                  text-xs
                  font-semibold

                  text-slate-500

                  transition

                  hover:text-violet-600

                  dark:text-slate-400
                  dark:hover:text-violet-400
                "
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            {errors.password && (
              <p
                className="
                  mt-2
                  text-sm
                  text-red-500

                  dark:text-red-400
                "
              >
                {errors.password}
              </p>
            )}

          </div>

          {/* ==========================================
              REMEMBER ME
          ========================================== */}

          <div className="flex items-center gap-2">

            <input
              id="remember"
              type="checkbox"
              checked={formData.rememberMe}
              className="
                h-4
                w-4
                cursor-pointer
                accent-violet-600
              "
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  rememberMe:
                    e.target.checked,
                }))
              }
            />

            <label
              htmlFor="remember"
              className="
                cursor-pointer
                text-sm

                text-slate-500

                dark:text-slate-400
              "
            >
              Remember me
            </label>

          </div>

          {/* ==========================================
              LOGIN BUTTON
          ========================================== */}

          <button
            type="submit"
            disabled={loading}
            className="
              group
              w-full
              cursor-pointer

              rounded-xl

              bg-gradient-to-r
              from-violet-600
              via-purple-600
              to-pink-500

              px-6
              py-3.5

              font-semibold
              text-white

              shadow-lg
              shadow-violet-200

              transition
              duration-300

              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-violet-300

              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0

              dark:shadow-violet-950/40
            "
          >
            <span
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading
                ? "Logging in..."
                : "Login"}

              {!loading && (
                <span
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              )}
            </span>
          </button>
        </form>

        {/* ==========================================
            DIVIDER
        ========================================== */}

        <div className="my-7 flex items-center gap-4">

          <div
            className="
              h-px
              flex-1

              bg-slate-200

              dark:bg-slate-700
            "
          />

          <span
            className="
              text-xs

              text-slate-400

              dark:text-slate-500
            "
          >
            OR
          </span>

          <div
            className="
              h-px
              flex-1

              bg-slate-200

              dark:bg-slate-700
            "
          />

        </div>

        {/* ==========================================
            GOOGLE
        ========================================== */}

        <button
          type="button"
          onClick={googleLogin}
          className="
            w-full
            cursor-pointer

            rounded-xl

            border
            border-slate-200

            bg-white

            px-5
            py-3

            font-medium

            text-slate-700

            transition
            duration-300

            hover:border-violet-200
            hover:bg-violet-50

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-200

            dark:hover:border-violet-500/50
            dark:hover:bg-slate-700
          "
        >
          Continue with Google
        </button>

        {/* ==========================================
            REGISTER
        ========================================== */}

        <p
          className="
            mt-7
            text-center
            text-sm

            text-slate-500

            dark:text-slate-400
          "
        >
          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              font-semibold

              text-violet-600

              transition

              hover:text-pink-500

              dark:text-violet-400
            "
          >
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}