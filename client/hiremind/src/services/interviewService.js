import axios from "axios";
import { getToken } from "./authService";
const API_URL = "http://localhost:8080/api/interview";

// Generate interview questions
export const generateInterviewQuestions = async (jobRole) => {
 

  const response = await axios.post(
    `${API_URL}/generate`,
    {
      jobRole,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};