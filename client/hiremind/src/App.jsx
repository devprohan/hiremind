import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import GoogleSuccess from "./pages/GoogleSuccess";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyOTPPage from "./pages/VerifyOTPPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UploadResumePage from "./pages/UploadResumePage";

import MyResumesPage from "./pages/MyResumePage";

import DashboardLayout from "./layouts/DashboardLayout";
import ResumeAnalysisPage from "./pages/ResumeAnalysisPage";
import ProtectedRoute from "./components/protect/protectRoute";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import JobMatchPage from "./pages/JobMatchPage";
import InterviewPrepPage from "./pages/InterviewPrepPage";

function App() {
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("preferences")) || {};

      if (saved.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
       <Route
    path="/google-success"
    element={<GoogleSuccess />}
  />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="upload-resume" element={<UploadResumePage />} />
        <Route path="my-resume" element={<MyResumesPage />} />
        <Route path="resume/:id" element={<ResumeAnalysisPage />} />
        <Route path="job-match" element={<JobMatchPage />} />
        <Route path="interview-prep" element={<InterviewPrepPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
