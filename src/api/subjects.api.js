import axiosInstance from "./axiosInstance";

export const fetchAllSubjects_GET = (id) => {
  return axiosInstance.get(`/timetables/${id}/subjects`);
};

export const fetchSubject_GET = (id) => {
  return axiosInstance.get(`/subjects/${id}`);
};

export const createSubject_POST = (id, data) => {
  return axiosInstance.post(`/timetables/${id}/subjects`, data);
};

export const deleteSubject_DELETE = (id) => {
  return axiosInstance.delete(`/subjects/${id}`);
};

export const updateSubject_PATCH = (timetableId, subjectId, data) => {
  return axiosInstance.patch(
    `/timetables/${timetableId}/subjects/${subjectId}`,
    data,
  );
};