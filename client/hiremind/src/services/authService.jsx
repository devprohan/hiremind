import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const authAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Register
export const registerUser = async (userData) => {
  const response = await authAPI.post("/register", userData);

  // Remove old client-side account data
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  localStorage.removeItem("user");
  sessionStorage.removeItem("user");

  localStorage.removeItem("profile");
  sessionStorage.removeItem("profile");

  // Store only user information
  // JWT is now stored in HttpOnly cookie by backend
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
  const response = await authAPI.post(
    "/login",
    userData
  );

  const { user } = response.data;

  // Remove old token/user data
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  localStorage.removeItem("user");
  sessionStorage.removeItem("user");

  // Store only user information
  // Authentication token is handled by HttpOnly cookie
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
    // Remove frontend user data
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    localStorage.removeItem("profile");
    sessionStorage.removeItem("profile");

    // Token is cleared by backend using res.clearCookie()
  }
};

// Google Login
export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};