import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/forgot-password`, {
        email: email.trim(),
      });

      // Move to OTP page
      navigate("/verify-otp", {
        state: {
          email: email.trim(),
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-slate-50
        px-4
        py-12

        transition-colors
        duration-300

        dark:bg-slate-950
      "
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -left-24
            -top-24
            h-96
            w-96
            rounded-full
            bg-violet-300/30
            blur-[120px]

            dark:bg-violet-900/20
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
            bg-pink-300/30
            blur-[120px]

            dark:bg-pink-900/20
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
            bg-cyan-200/20
            blur-[120px]

            dark:bg-cyan-900/10
          "
        />
      </div>

      {/* Card */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-[32px]

          border
          border-white/70

          bg-white/90

          p-8

          shadow-[0_25px_80px_rgba(124,58,237,0.15)]

          backdrop-blur-xl

          transition-colors
          duration-300

          dark:border-slate-700
          dark:bg-slate-900/90
          dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)]

          md:p-10
        "
      >
        {/* =========================
            LOGO
        ========================= */}

        <Link
          to="/login"
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

        {/* =========================
            HEADING
        ========================= */}

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
            Forgot Password?
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-500

              dark:text-slate-400
            "
          >
            Enter your email and we'll send you an OTP.
          </p>
        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
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

              dark:border-red-900/50
              dark:bg-red-500/10
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
          noValidate
        >
          {/* Email */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700

                dark:text-slate-300
              "
            >
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-slate-800
                outline-none
                transition
                duration-300

                placeholder:text-slate-400

                focus:border-violet-500
                focus:ring-4
                focus:ring-violet-100

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-violet-500
                dark:focus:ring-violet-500/20
              "
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="
              group
              w-full
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

              dark:shadow-violet-950/40

              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* =========================
            BACK TO LOGIN
        ========================= */}

        <p
          className="
            mt-7
            text-center
            text-sm
            text-slate-500

            dark:text-slate-400
          "
        >
          Remember your password?{" "}

          <Link
            to="/login"
            className="
              font-semibold
              text-violet-600
              transition

              hover:text-pink-500

              dark:text-violet-400
              dark:hover:text-pink-400
            "
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}