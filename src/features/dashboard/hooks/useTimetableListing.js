import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllTimetables,
  createTimetable,
  deleteTimeTable,
} from "../../../api/timetables.api";
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

  //helper function that returns query data like data,error,isPending,isError etc:
  const readListings = () => {
    return { ...query };
  };

  return { readListings, createListing, deleteListing };
};

export default useTimetableListing;
