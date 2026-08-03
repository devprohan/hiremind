import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDashboardStats = async () => {
  const response = await axios.get(
    `${API_URL}/stats`,
    getAuthConfig()
  );

  return response.data;
};

export const getRecentResumes = async () => {
  const response = await axios.get(
    `${API_URL}/recent`,
    getAuthConfig()
  );

  return response.data;
};

export const getSkillsAnalytics = async () => {
  const response = await axios.get(
    `${API_URL}/skills`,
    getAuthConfig()
  );

  return response.data;
};