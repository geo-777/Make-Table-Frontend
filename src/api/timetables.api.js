import axiosInstance from "./axiosInstance";

export const fetchAllTimetables = async () => {
  return axiosInstance.get("/timetables");
};
export const createTimetable = async (data) => {
  return axiosInstance.post("/timetables", data);
};

export const deleteTimeTable = async (id) => {
  return axiosInstance.delete(`/timetables/${id}`);
};

export const patchTimeTable = async (id, data) => {
  return axiosInstance.patch(`/timetables/${id}`, data);
};

export const viewStatusTable = async (id, status) => {
  return axiosInstance.patch(`/timetables/${id}`, { view_status: status });
};
