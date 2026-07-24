import axios from "axios";

const API = "http://localhost:8080/api/user";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getCurrentUser = async () => {
  const res = await axios.get(`${API}/me`, {
    headers: authHeader(),
  });

  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axios.put(`${API}/profile`, data, {
    headers: authHeader(),
  });

  return res.data;
};