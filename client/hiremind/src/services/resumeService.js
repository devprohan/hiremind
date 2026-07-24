import axios from "axios";

const API = "http://localhost:8080/api/resume";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const uploadResume = async (formData) => {
  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getMyResumes = async () => {
  const res = await axios.get(`${API}/my-resumes`, {
    headers: authHeader(),
  });

  return res.data;
};

export const getResumeById = async (id) => {
  const res = await axios.get(`${API}/${id}`, {
    headers: authHeader(),
  });

  return res.data;
};

export const deleteResume = async (id) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: authHeader(),
  });

  return res.data;
};

export const reanalyzeResume = async (id) => {
  const res = await axios.put(
    `${API}/reanalyze/${id}`,
    {},
    {
      headers: authHeader(),
    }
  );

  return res.data;
};