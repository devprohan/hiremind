import { motion } from "framer-motion";
import { LogOut, AlertTriangle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../services/authService";

const DangerZone = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await logoutUser(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Logged out successfully");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to logout"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <AlertTriangle
          size={28}
          className="text-red-600"
        />

        <h2 className="text-2xl font-bold text-red-700">
          Danger Zone
        </h2>
      </div>

      <p className="mt-3 text-slate-600">
        Logging out will end your current session.
        You can log in again anytime using your
        credentials.
      </p>

      <button
        onClick={handleLogout}
        className="mt-8 flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
      >
        <LogOut size={18} />
        Logout
      </button>
    </motion.div>
  );
};

export default DangerZone;