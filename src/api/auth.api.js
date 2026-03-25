import axiosInstance from "./axiosInstance";

export const login = async (data) => {
  return axiosInstance.post("/login", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
  });
};

export const register = async (data) => {
  return axiosInstance.post("/register", data);
};

export const checkLoggedIn = async () => {
  return axiosInstance.get("/me", { withCredentials: true });
};

export const refresh = async () => {
  return axiosInstance.post("/refresh", { withCredentials: true });
};
export const logoutAxiosRequest = async () => {
  return axiosInstance.post("/logout");
};
