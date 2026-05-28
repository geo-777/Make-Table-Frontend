import axiosInstance from "./axiosInstance";

export const fetchAllAssignments = async (id) => {
  return axiosInstance.get(`/assignments/${id}`);
};
export const postAssignment = async (data) => {
  return axiosInstance.post(`/assignments`, data);
};

export const deleteAssignment = async (id) => {
  return axiosInstance.delete(`/assignments/${id}`);
};

export const patchAssignment = async (timetableId, classId, data) => {
  return axiosInstance.patch(`/assignments/${id}`, data);
};
