import {
  fetchAllClasses,
  postClass,
  deleteClass,
  patchClass,
} from "../../../api/classes.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { toast } from "react-toastify";

const useClasses = () => {
  const { selectedTimetableData } = useTimeTableSelect();
  const timetableId = selectedTimetableData?.id || undefined;
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

  const query = useQuery({
    queryKey: ["classesListings", timetableId],
    queryFn: () => fetchAllClasses(timetableId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!timetableId,
  });

  const createListing = useMutation({
    mutationFn: ({ id, data }) => postClass(id, data),

    onSuccess: (newClass, { id }) => {
      queryClient.setQueryData(["classesListings", id], (old) => ({
        ...old,
        data: [...(old?.data || []), newClass.data],
      }));
    },

    onError: (error) => {
      const status = error?.response?.status;
      handleError(status);
    },
  });

  const deleteListing = useMutation({
    mutationFn: (classId) => deleteClass(classId), // classId only

    onSuccess: (_, classId) => {
      queryClient.setQueryData(["classesListings", timetableId], (old) => ({
        ...old,
        data: old?.data?.filter((e) => e.id !== classId) || [],
      }));
    },

    onError: (error) => {
      const status = error?.response?.status;
      handleError(status);
    },
  });

  const patchListing = useMutation({
    mutationFn: ({ classId, data }) => {
      console.log(classId, data);
      return patchClass(timetableId, classId, data);
    },
    onError: (error) => {
      const status = error?.response?.status;
      handleError(status);
    },
  });
  return { ...query, createListing, deleteListing, patchListing };
};

export default useClasses;
