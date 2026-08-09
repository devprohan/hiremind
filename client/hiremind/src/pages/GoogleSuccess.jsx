import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");

    if (!token) {
      console.error("Google login token not found");
      navigate("/login");
      return;
    }

    // Save token
    localStorage.setItem("token", token);

    // Save user
    if (userData) {
      try {
        const user = JSON.parse(userData);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to parse Google user data:", error);
      }
    }

    // Redirect to dashboard
    navigate("/dashboard", { replace: true });
  }, [navigate, searchParams]);

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