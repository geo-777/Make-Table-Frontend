import axiosInstance from "./axiosInstance";
import { useAuth } from "../app/providers/AuthProvider";

export const fetchAllTimetables = async () => {
  return axiosInstance.get("/timetables");
  //   try {
  //     const { data } = await axiosInstance.get("/timetables");
  //     return data;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
};
