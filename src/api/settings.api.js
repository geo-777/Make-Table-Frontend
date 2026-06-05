import axiosInstance from "./axiosInstance";

export const changePassword__PATCH = (data) => {
  return axiosInstance.patch("/change-password", data);
};

export const changeUsername__PATCH = (data) => {
  return axiosInstance.patch("/change-username", data);
};
