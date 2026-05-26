import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllTimetables,
  createTimetable,
  patchTimeTable,
  deleteTimeTable,
  viewStatusTable,
} from "../../../api/timetables.api";
import { toast } from "react-toastify";

//this hook handles all backend connection : ALL CRUD

const TIMETABLE_KEY = ["timetableListings"];

const useTimetableListing = () => {
  const queryClient = useQueryClient();

  const handleError = (status) => {
    if (!status) return toast.error("Unknown error occurred.");

    if (status >= 500 && status < 600) {
      toast.error("Internal Server error. Please try again later.");
    } else if (status === 429) {
      toast.error("Too many attempts. Try again in a few minutes.");
    } else {
      toast.error("Unknown error occurred.");
    }
  };

  // querying read operation
  const query = useQuery({
    queryKey: TIMETABLE_KEY,
    queryFn: fetchAllTimetables,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // helper function for updating cache using callbacks
  const updateTimeTableCache = (updateFn) => {
    queryClient.setQueryData(TIMETABLE_KEY, (oldData) => {
      if (!oldData?.data) {
        queryClient.invalidateQueries({
          queryKey: TIMETABLE_KEY,
        });

        return oldData;
      }

      return updateFn(oldData);
    });
  };

  // create
  const createListing = useMutation({
    mutationFn: createTimetable,

    onSuccess: (response) => {
      const newTimetable = response.data;

      updateTimeTableCache((oldData) => ({
        ...oldData,
        data: [...oldData.data, newTimetable],
      }));

      toast.success("Timetable created successfully.");
    },

    onError: (error) => {
      handleError(error?.response?.status);
    },
  });

  // delete
  const deleteListing = useMutation({
    mutationFn: deleteTimeTable,

    onSuccess: (_, id) => {
      updateTimeTableCache((oldData) => ({
        ...oldData,
        data: oldData.data.filter((e) => e.id !== id),
      }));
    },

    onError: (error) => {
      handleError(error?.response?.status);
    },
  });

  // edit
  const patchListing = useMutation({
    mutationFn: ({ id, data }) => patchTimeTable(id, data),

    onSuccess: (response, { id }) => {
      const editedTimetable = response.data;

      updateTimeTableCache((oldData) => ({
        ...oldData,
        data: oldData.data.map((elm) =>
          elm.id === id ? editedTimetable : elm,
        ),
      }));

      toast.success("Timetable edited successfully.");
    },

    onError: (error) => {
      handleError(error?.response?.status);
    },
  });

  // publish / unpublish
  const setViewStatus = useMutation({
    mutationFn: ({ id, data }) => viewStatusTable(id, data),

    onSuccess: (response, { id }) => {
      const editedTimetable = response.data;

      updateTimeTableCache((oldData) => ({
        ...oldData,
        data: oldData.data.map((elm) =>
          elm.id === id ? editedTimetable : elm,
        ),
      }));

      toast.success(
        editedTimetable.view_status === "Public"
          ? "Timetable is now public."
          : "Timetable is now private.",
      );
    },

    onError: (error) => {
      handleError(error?.response?.status);
    },
  });

  const readListings = () => ({ ...query });

  return {
    readListings,
    createListing,
    deleteListing,
    patchListing,
    setViewStatus,
  };
};

export default useTimetableListing;
