import axiosInstance from "./axiosInstance";

export const login = async (data) => {
  return axiosInstance.post("/login", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
  });
};

export const checkLoggedIn = async () => {
  return axiosInstance.get("/me", { withCredentials: true });
};

export const refresh = async () => {
  return axiosInstance.post("/refresh", { withCredentials: true });
};
