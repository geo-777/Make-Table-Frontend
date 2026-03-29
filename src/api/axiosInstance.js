import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

//acts as middleware to refreshToken
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("hey");
    console.log("config", error.config);
    return Promise.reject(error);
  },
);

export default axiosInstance;
