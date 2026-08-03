import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  // Remove previous account data
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("profile");

  // Store NEW user's token
  if (response.data.token) {
    localStorage.setItem(
      "token",
      response.data.token
    );
  }

  // Store new user if backend sends it
  if (response.data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  localStorage.setItem(
    "token",
    response.data.token
  );

  if (response.data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );
  }

  return response.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem("token");

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
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
  }
};