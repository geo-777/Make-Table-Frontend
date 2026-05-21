import axiosInstance from "./axiosInstance";

export const fetchAllClasses = async (id) => {
  return axiosInstance.get(`/timetables/${id}/classes`);
};
export const postClass = async (id, data) => {
  return axiosInstance.post(`/timetables/${id}/classes`, data);
};

export const deleteClass = async (id) => {
  return axiosInstance.delete(`/classes/${id}`);
};

export const patchClass = async (timetableId, classId, data) => {
  return axiosInstance.patch(
    `/timetables/${timetableId}/classes/${classId}`,
    data,
  );
};
