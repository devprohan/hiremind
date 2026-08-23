import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/resume`;

const authConfig = {
  withCredentials: true,
};

// Upload Resume
export const uploadResume = async (formData) => {
  const res = await axios.post(
    `${API}/upload`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

// Get all resumes
export const getMyResumes = async () => {
  const res = await axios.get(
    `${API}/my-resumes`,
    authConfig
  );

  return res.data;
};

// Get resume by ID
export const getResumeById = async (id) => {
  const res = await axios.get(
    `${API}/${id}`,
    authConfig
  );

  return res.data;
};

// Delete resume
export const deleteResume = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    authConfig
  );

  return res.data;
};

// Reanalyze resume
export const reanalyzeResume = async (id) => {
  const res = await axios.put(
    `${API}/reanalyze/${id}`,
    {},
    authConfig
  );

  return res.data;
};