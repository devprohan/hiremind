import axios from "axios";
import { getToken } from "./authService";
const API = "http://localhost:8080/api/users";

const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
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


export const changePassword = async (data) => {
 
  const response = await axios.put(
    "http://localhost:8080/api/auth/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};



