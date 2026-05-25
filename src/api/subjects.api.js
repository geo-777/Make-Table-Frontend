import axiosInstance from "./axiosInstance";

export const getAllSubjects = (id) => {
  return axiosInstance.get(`/timetables/${id}/subjects`);
};

export const getSubject = (id) => {
  return axiosInstance.get(`/subjects/${id}`);
};

export const createSubject = (id, data) => {
  return axiosInstance.post(`/timetables/${id}/subjects`, data);
};

export const deleteSubject = (id) => {
  return axiosInstance.delete(`/subjects/${id}`);
};

export const updateSubject = (timetableId, subjectId, data) => {
  return axiosInstance.patch(
    `/timetables/${timetableId}/subjects/${subjectId}`,
    data,
  );
};