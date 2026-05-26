import axiosInstance from "./axiosInstance";

export const fetchAllTeachers_GET = (id) => {
  return axiosInstance.get(`/timetables/${id}/teachers`);
};

export const fetchTeacher_GET = (id) => {
  return axiosInstance.get(`/teachers/${id}`);
};

export const createTeacher_POST = (id, data) => {
  return axiosInstance.post(`/timetables/${id}/teachers`, data);
};

export const deleteTeacher_DELETE = (id) => {
  return axiosInstance.delete(`/teachers/${id}`);
};

export const updateTeachers_PATCH = (timetableId, teacherId, data) => {
  return axiosInstance.patch(
    `/timetables/${timetableId}/teachers/${teacherId}`,
    data,
  );
}