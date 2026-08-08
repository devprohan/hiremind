import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const getToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  // Remove previous account data
 localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  localStorage.removeItem("user");
  sessionStorage.removeItem("user");

  localStorage.removeItem("profile");
  sessionStorage.removeItem("profile");

  // Store NEW user's token
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  // Store new user if backend sends it
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  const { token ,user} = response.data;

  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  localStorage.removeItem("user");
  sessionStorage.removeItem("user");


  if (userData.rememberMe) {
    //keep login for longer
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  

  return response.data;
};

export const logoutUser = async () => {
  const token = getToken();

  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } finally {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    localStorage.removeItem("profile");
    sessionStorage.removeItem("profile");
  }
};

export const googleLogin = () => {
  window.location.href = "http://localhost:8080/api/auth/google";
};