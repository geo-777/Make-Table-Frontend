import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllTimetables,
  createTimetable,
  patchTimeTable,
  deleteTimeTable,
  viewStatusTable,
} from "../../../api/timetables.api";
import { toast } from "react-toastify";

const useTimetableListing = () => {
  const handleError = (status) => {
    if (!status) toast.error("Unknown error occured.");

    if (status >= 500 && status < 600) {
      toast.error("Internal Server error. Please try again later.");
    } else if (status === 429) {
      toast.error("Too many attempts. Try again in a few minutes.");
    } else {
      toast.error("Unknown error occured.");
    }
  };

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

      toast.success("Timetable created successfully.");
    },
    onError: (error) => {
      //console.log(error);
      const status = error?.response?.status;
      handleError(status);
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
    onError: (error) => {
      //console.log(error);
      const status = error?.response?.status;

      handleError(status);
    },
  });

  //patching mutation
  const patchListing = useMutation({
    mutationFn: ({ id, data }) => patchTimeTable(id, data),
    onSuccess: (response, { id }) => {
      const editedTimetable = response.data;

      queryClient.setQueryData(["timetableListings"], (oldData) => {
        if (!oldData?.data) {
          return queryClient.invalidateQueries({
            queryKey: ["timetableListings"],
          });
        } // safety check

        return {
          ...oldData,
          data: oldData.data.map((elm) =>
            id === elm.id ? editedTimetable : elm,
          ),
        };
      });

      toast.success("Timetable edited successfully.");
    },

    onError: (error) => {
      const status = error?.response?.status;
      handleError(status);
    },
  });

  //publish, unpublish basically
  const setViewStatus = useMutation({
    mutationFn: ({ id, data }) => viewStatusTable(id, data),
    onSuccess: (response, { id }) => {
      const editedTimetable = response.data;

      queryClient.setQueryData(["timetableListings"], (oldData) => {
        if (!oldData?.data) {
          return queryClient.invalidateQueries({
            queryKey: ["timetableListings"],
          });
        } // safety check

        return {
          ...oldData,
          data: oldData.data.map((elm) =>
            id === elm.id ? editedTimetable : elm,
          ),
        };
      });
      if (editedTimetable.view_status === "Public") {
        toast.success("Timetable is now public.");
      } else {
        toast.success("Timetable is now private.");
      }
    },

    onError: (error) => {
      const status = error?.response?.status;
      handleError(status);
    },
  });

  //helper function that returns query data like data,error,isPending,isError etc:
  const readListings = () => {
    return { ...query };
  };

  return {
    readListings,
    createListing,
    deleteListing,
    patchListing,
    setViewStatus,
  };
};

export default useTimetableListing;
