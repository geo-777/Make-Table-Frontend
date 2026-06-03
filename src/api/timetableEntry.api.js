import axiosInstance from "./axiosInstance";

export const getClassTimetable_GET = (classId) => {
  return axiosInstance
    .get(`/classes/${classId}/entries`)
    .then((res) => res.data);
};

export const getTeacherTimetable_GET = (teacherId) => {
  return axiosInstance
    .get(`/teacher/${teacherId}/entries`)
    .then((res) => res.data);
};