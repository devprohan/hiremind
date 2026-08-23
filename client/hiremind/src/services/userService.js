import api from "./api";

export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};

export const getPreferences = async () => {
  const res = await api.get("/users/preferences");
  return res.data;
};

export const updatePreferences = async (preferences) => {
  const res = await api.put("/users/preferences", preferences);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await api.delete("/users/account");
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put("/auth/change-password", data);
  return res.data;
};