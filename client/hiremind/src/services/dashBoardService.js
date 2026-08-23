import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard";

const authConfig = {
  withCredentials: true,
};

// Dashboard Stats
export const getDashboardStats = async () => {
  const response = await axios.get(
    `${API_URL}/stats`,
    authConfig
  );

  return response.data;
};

// Recent Resumes
export const getRecentResumes = async () => {
  const response = await axios.get(
    `${API_URL}/recent`,
    authConfig
  );

  return response.data;
};

// Skills Analytics
export const getSkillsAnalytics = async () => {
  const response = await axios.get(
    `${API_URL}/skills`,
    authConfig
  );

  return response.data;
};