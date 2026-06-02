import axiosInstance from "./axiosInstance";

export const generate_POST = (timetableId, forceGenerate) => {
  return axiosInstance.post(`/timetable/${timetableId}/generate`, {
    force_generation: forceGenerate,
  });
};

export const getTimetableStatus_GET = (timetableId) => {
  return axiosInstance.get(`/timetable/${timetableId}/status`);
};