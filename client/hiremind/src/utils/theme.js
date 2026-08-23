// src/utils/theme.js

export const getStoredTheme = () => {
  return localStorage.getItem("theme") || "light";
};

export const applyTheme = (theme) => {
  const isDark = theme === "dark";

  document.documentElement.classList.toggle("dark", isDark);

  document.body.classList.toggle("dark", isDark);

  localStorage.setItem(
    "theme",
    isDark ? "dark" : "light"
  );
};

export const initializeTheme = () => {
  const theme = getStoredTheme();

  applyTheme(theme);
};