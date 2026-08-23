import axios from "axios";

const API = "http://localhost:8080/api/users";

const authConfig = {
  withCredentials: true,
};

// Get current user
export const getCurrentUser = async () => {
  const res = await axios.get(`${API}/me`, authConfig);

  return res.data;
};

// Update profile
export const updateProfile = async (data) => {
  const res = await axios.put(
    `${API}/profile`,
    data,
    authConfig
  );

  return res.data;
};

// Change password
export const changePassword = async (data) => {
  const res = await axios.put(
    "http://localhost:8080/api/auth/change-password",
    data,
    authConfig
  );

  return res.data;
};

// Get preferences
export const getPreferences = async () => {
  const res = await axios.get(
    `${API}/preferences`,
    authConfig
  );

  return res.data;
};

// Update preferences
export const updatePreferences = async (preferences) => {
  const res = await axios.put(
    `${API}/preferences`,
    preferences,
    authConfig
  );

  return res.data;
};

// Delete account
export const deleteAccount = async () => {
  const res = await axios.delete(
    `${API}/account`,
    authConfig
  );

  return res.data;
};