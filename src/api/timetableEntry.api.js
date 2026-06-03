import axiosInstance from "./axiosInstance";

export const getClassTimetable_GET = (classId) => {
  return axiosInstance.get(`/classes/${classId}/entries`);
};

export const getTeacherTimetable_GET = (teacherId) => {
  return axiosInstance.get(`/teacher/${teacherId}/entries`);
};