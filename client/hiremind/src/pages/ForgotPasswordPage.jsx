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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        {/* Logo */}
        <Link
          to="/login"
          className="mb-8 flex items-center justify-center gap-2"
        >
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 text-xl font-black text-white">
            H
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            Hire<span className="text-violet-600">Mind</span>
          </h2>
        </Link>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900">
            Forgot Password?
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your email and we'll send you an OTP.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* Back to login */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Remember your password?{" "}

          <Link
            to="/login"
            className="font-semibold text-violet-600 hover:text-pink-500"
          >
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}