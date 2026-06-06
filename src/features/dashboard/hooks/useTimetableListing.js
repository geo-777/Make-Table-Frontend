import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllTimetables,
  createTimetable,
  patchTimeTable,
  deleteTimeTable,
  viewStatusTable,
} from "../../../api/timetables.api";
import { updateQueryCache } from "../../../shared/utils/queryCacheHelper";
import { toast } from "react-toastify";
import handleApiError, {
  Component_Type,
} from "../../../shared/utils/apiErrorHandler";
//this hook handles all backend connection : ALL CRUD

const TIMETABLE_KEY = ["timetableListings"];

const useTimetableListing = () => {
  const queryClient = useQueryClient();

  // querying read operation
  const query = useQuery({
    queryKey: TIMETABLE_KEY,
    queryFn: fetchAllTimetables,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // create
  const createListing = useMutation({
    mutationFn: createTimetable,

    onSuccess: (response) => {
      const newTimetable = response.data;

      updateQueryCache({
        queryClient,
        queryKey: TIMETABLE_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: [...oldData.data, newTimetable],
        }),
      });

      toast.success("Timetable created successfully.");
    },

    onError: (error) => {
      handleApiError(error?.response?.stus, Component_Type.TIMETABLES);
      error?.response?.status;
    },
  });

  // delete
  const deleteListing = useMutation({
    mutationFn: deleteTimeTable,

    onSuccess: (_, id) => {
      updateQueryCache({
        queryClient,
        queryKey: TIMETABLE_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: oldData.data.filter((e) => e.id !== id),
        }),
      });
    },

    onError: (error) => {
      handleApiError(error?.response?.stus, Component_Type.TIMETABLES);
      error?.response?.status;
    },
  });

  // edit
  const patchListing = useMutation({
    mutationFn: ({ id, data }) => patchTimeTable(id, data),

    onSuccess: (response, { id }) => {
      const editedTimetable = response.data;

      updateQueryCache({
        queryClient,
        queryKey: TIMETABLE_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: oldData.data.map((elm) =>
            elm.id === id ? editedTimetable : elm,
          ),
        }),
      });

      toast.success("Timetable edited successfully.");
    },

    onError: (error) => {
      handleApiError(error?.response?.stus, Component_Type.TIMETABLES);
      error?.response?.status;
    },
  });

  // publish / unpublish
  const setViewStatus = useMutation({
    mutationFn: ({ id, data }) => viewStatusTable(id, data),

    onSuccess: (response, { id }) => {
      const editedTimetable = response.data;

      updateQueryCache({
        queryClient,
        queryKey: TIMETABLE_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: oldData.data.map((elm) =>
            elm.id === id ? editedTimetable : elm,
          ),
        }),
      });

      toast.success(
        editedTimetable.view_status === "Public"
          ? "Timetable is now public."
          : "Timetable is now private.",
      );
    },

    onError: (error) => {
      handleApiError(error?.response?.stus, Component_Type.TIMETABLES);
      error?.response?.status;
    },
  });

  const invalidateTimeTableListings = () => {
    queryClient.invalidateQueries({
      queryKey: TIMETABLE_KEY,
    });
  };

  const readListings = () => ({ ...query });

  return {
    readListings,
    createListing,
    deleteListing,
    patchListing,
    setViewStatus,
    invalidateTimeTableListings,
  };
};

export default useTimetableListing;
