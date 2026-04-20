import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllTimetables,
  createTimetable,
  patchTimeTable,
  deleteTimeTable,
} from "../../../api/timetables.api";
import { toast } from "react-toastify";
const useTimetableListing = () => {
  const queryClient = useQueryClient();
  //querying read operation
  const query = useQuery({
    queryKey: ["timetableListings"],
    queryFn: fetchAllTimetables,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  //mutation for creation
  const createListing = useMutation({
    mutationFn: createTimetable,
    onSuccess: (response) => {
      const newTimetable = response.data;

      queryClient.setQueryData(["timetableListings"], (oldData) => {
        if (!oldData?.data) {
          return queryClient.invalidateQueries({
            queryKey: ["timetableListings"],
          });
        } // safety check to handle 404 empty data edge case.

        return {
          ...oldData,
          data: [...oldData.data, newTimetable],
        };
      });
    },
    onError: (error) => {
      //console.log(error);
      const status = error?.response?.status;

      if (!status) toast.error("Unknown error occured.");

      if (status >= 500 && status < 600) {
        toast.error("Internal Server error. Please try again later.");
      } else if (status === 429) {
        toast.error("Too many attempts. Try again in a few minutes.");
      } else {
        toast.error("Unknown error occured.");
      }
    },
  });
  //mutation for deletion
  const deleteListing = useMutation({
    mutationFn: (id) => deleteTimeTable(id),
    onSuccess: (_, id) => {
      //console.log(response, data);

      queryClient.setQueryData(["timetableListings"], (oldData) => {
        if (!oldData?.data) {
          return queryClient.invalidateQueries({
            queryKey: ["timetableListings"],
          });
        } // safety check
        return {
          ...oldData,
          data: oldData.data.filter((e) => e.id != id),
        };
      });
    },
  });

  //patching mutation
  const patchListing = useMutation({
    mutationFn: (id, data) => patchTimeTable(id, data),
    onSuccess: (data, newData) => {},
  });

  //helper function that returns query data like data,error,isPending,isError etc:
  const readListings = () => {
    return { ...query };
  };

  return { readListings, createListing, deleteListing };
};

export default useTimetableListing;
