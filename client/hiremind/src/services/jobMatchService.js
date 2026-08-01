import API from "./profileService";

export const matchJob = async (resumeId, jobDescription) => {
  const response = await API.post("/job/match", {
    resumeId,
    jobDescription,
  });

  return response.data;
};