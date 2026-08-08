import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:8080/api/dashboard";

const getAuthConfig = () => {
  

  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
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