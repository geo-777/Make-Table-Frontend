import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { createSubject, deleteSubject, getAllSubjects, updateSubject } from "../../../api/subjects.api";

// --- Keys --------------------------------------------
export const subjectKeys = {
  all: ["subjects"],
  timetable: (id) => ["subjects", id],
};

// --- Error Handling --------------------------------------------

const handleError = (error) => {
  const status = error?.response?.status;

  if (!status) {
    toast.error("Unknown error occurred.");
    return;
  }

  if (status >= 500) {
    toast.error("Internal server error. Please try again later.");
    return;
  }

  if (status === 429) {
    toast.error("Too many attempts. Try again in a few minutes.");
    return;
  }

  toast.error("Something went wrong.");
};

// --- Hook --------------------------------------------

const useSubjects = () => {
  const queryClient = useQueryClient();
  const { selectedTimetableData } = useTimeTableSelect();
  const timetableId = selectedTimetableData?.id;

  const subjectQuery = useQuery({
    queryKey: subjectKeys.timetable(timetableId),
    queryFn: () => getAllSubjects(timetableId),
    enabled: Boolean(timetableId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // -------------------------------------------------------------------

  const createSubjectMutation = useMutation({
    mutationFn: ({ id, data }) => createSubject(id, data),

    onSuccess: (response, variables) => {
      const newSubject = response?.data;

      queryClient.setQueryData(
        subjectKeys.timetable(variables.id),
        (oldData) => {
          if (!oldData) {
            return {
              data: [newSubject],
            };
          }

          return {
            ...oldData,
            data: [...(oldData?.data ?? []), newSubject],
          };
        },
      );

      toast.success("Subject created successfully.");
    },

    onError: handleError,
  });

  // -------------------------------------------------------------------

  const deleteSubjectMutation = useMutation({
    mutationFn: (id) => deleteSubject(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: subjectKeys.timetable(timetableId),
      });

      const previousData = queryClient.getQueryData(
        subjectKeys.timetable(timetableId),
      );

      queryClient.setQueryData(
        subjectKeys.timetable(timetableId),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData?.data?.filter((item) => item.id !== id) ?? [],
          };
        },
      );

      return { previousData };
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(
        subjectKeys.timetable(timetableId),
        context?.previousData,
      );

      handleError(error);
    },

    onSuccess: () => {
      toast.success("Subject deleted successfully.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: subjectKeys.timetable(timetableId),
      });
    },
  });

  // -------------------------------------------------------------------

  const updateSubjectMutation = useMutation({
    mutationFn: ({ id, data }) => updateSubject(timetableId, id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: subjectKeys.timetable(timetableId),
      });

      const previousData = queryClient.getQueryData(
        subjectKeys.timetable(timetableId),
      );

      queryClient.setQueryData(
        subjectKeys.timetable(timetableId),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData?.data?.map((item) => item.id === id ? { ...item, ...data, } : item, ) ?? [],
          };
        },
      );

      return { previousData };
    },

    onSuccess: (response) => {
      const updatedSubject = response?.data;

      queryClient.setQueryData(
        subjectKeys.timetable(timetableId),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData?.data?.map((item) => item.id === updatedSubject.id ? updatedSubject : item, ) ?? [],
          };
        },
      );

      toast.success("Subject updated successfully");
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(
        subjectKeys.timetable(timetableId),
        context?.previousData,
      );

      handleError(error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: subjectKeys.timetable(timetableId),
      });
    },
  });

  // -------------------------------------------------------------------

  return {
    ...subjectQuery,
    createSubject: createSubjectMutation,
    deleteSubject: deleteSubjectMutation,
    updateSubject: updateSubjectMutation,
  };
};

export default useSubjects;