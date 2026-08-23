import axios from "axios";

const API_URL = "http://localhost:8080/api/interview";

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