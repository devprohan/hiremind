import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/dashboard`;

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