import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/interview`;

// Generate interview questions
export const generateInterviewQuestions = async (jobRole) => {
  const response = await axios.post(
    `${API_URL}/generate`,
    {
      jobRole,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};