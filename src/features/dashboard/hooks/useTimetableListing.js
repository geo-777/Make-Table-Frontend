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
    mutationFn: (newTable) => createTimetable(newTable),
    onSuccess: (newTable) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["timetableListings"],
      // });
      const existingData = queryClient.getQueryData(["timetableListings"]);

      queryClient.setQueryData(
        ["timetableListings"],
        [...existingData, newTable.data],
      );
    },
  });
  //mutation for deletion
  const deleteListing = useMutation({
    mutationFn: (id) => deleteTimeTable(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["timetableListings"],
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
