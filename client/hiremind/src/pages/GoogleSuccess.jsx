import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyGoogleLogin = async () => {
      try {
        const response = await api.get("/users/me");

        console.log("Google user response:", response.data);

        if (response.data?.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );

          navigate("/dashboard", { replace: true });
        } else {
          throw new Error("User data not received");
        }
      } catch (error) {
        console.error(
          "Google login verification failed:",
          error.response?.data || error.message
        );

        navigate("/login", { replace: true });
      }
    };

    verifyGoogleLogin();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />

        <h2 className="mt-5 text-xl font-semibold text-white">
          Signing you in...
        </h2>

        <p className="mt-2 text-slate-400">
          Please wait while we complete Google authentication.
        </p>
      </div>
    </div>
  );
};

export default GoogleSuccess;

