import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UploadResumePage from "./pages/UploadResumePage";

import MyResumesPage from "./pages/MyResumePage";

import DashboardLayout from "./layouts/DashboardLayout";
import ResumeAnalysisPage from "./pages/ResumeAnalysisPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="upload-resume" element={<UploadResumePage />} />
        <Route path="my-resume" element={<MyResumesPage />} />
        <Route path="resume/:id" element={<ResumeAnalysisPage />} />
      </Route>
      

      
    </Routes>
  );
}

export default App;
