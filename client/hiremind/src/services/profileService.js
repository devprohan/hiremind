import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// USER

export const getCurrentUser = async () => {
  const res = await API.get("/users/me");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/users/profile", data);
  return res.data;
};

// DASHBOARD

export const getDashboardStats = async () => {
  const res = await API.get("/dashboard/stats");
  return res.data;
};

export const getRecentResumes = async () => {
  const res = await API.get("/dashboard/recent");
  return res.data;
};

export const getSkillsAnalytics = async () => {
  const res = await API.get("/dashboard/skills");
  return res.data;
};

// RESUMES

export const getMyResumes = async () => {
  const res = await API.get("/resume/my-resumes");
  return res.data;
};

export default API;