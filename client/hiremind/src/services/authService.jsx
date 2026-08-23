import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const authAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Register
export const registerUser = async (userData) => {
  const response = await authAPI.post("/register", userData);

  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  localStorage.removeItem("profile");
  sessionStorage.removeItem("profile");

  if (response.data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await authAPI.post("/login", userData);

  const { user } = response.data;

  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");

  if (user) {
    const storage = userData.rememberMe
      ? localStorage
      : sessionStorage;

    storage.setItem(
      "user",
      JSON.stringify(user)
    );
  }

  return response.data;
};

// Logout
export const logoutUser = async () => {
  try {
    await authAPI.post("/logout");
  } finally {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("profile");
    sessionStorage.removeItem("profile");
  }
};

// Google Login
export const googleLogin = () => {
  window.location.href =
    `${import.meta.env.VITE_API_URL}/auth/google`;
};