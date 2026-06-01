import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";

import {
  createSubject_POST,
  fetchSubject_GET,
  fetchAllSubjects_GET,
  updateSubject_PATCH,
  deleteSubject_DELETE,
} from "../../../api/subjects.api";

// --- Keys --------------------------------------------
export const subjectKeys = {
  all: ["subjects"],
  timetable: (id) => ["subjects", id],
  single: (id) => ["subjects", "single", id],
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
  toast.error(error?.response?.data?.message ?? "Something went wrong.");
};

// --- Hydration helper --------------------------------------------
const hydrateSubjects = async (subjects, queryClient) => {
  const results = await Promise.all(
    subjects.map((subject) =>
      queryClient.fetchQuery({
        queryKey: subjectKeys.single(subject.id),
        queryFn: () => fetchSubject_GET(subject.id),
        staleTime: 5 * 60 * 1000,
      }),
    ),
  );
  return results.map((r) => {
    if (r && typeof r === "object" && "data" in r) return r.data;
    return r;
  });
};

// --- Hook --------------------------------------------
const useSubjects = () => {
  const queryClient = useQueryClient();
  const { selectedTimetableData } = useTimeTableSelect();
  const timetableId = selectedTimetableData?.id;

  const subjectQuery = useQuery({
    queryKey: subjectKeys.timetable(timetableId),
    queryFn: async () => {
      const listResponse = await fetchAllSubjects_GET(timetableId);
      const subjects = listResponse?.data ?? listResponse ?? [];

      const hydrated = await hydrateSubjects(subjects, queryClient);

      return { ...listResponse, data: hydrated };
    },
    enabled: Boolean(timetableId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // -------------------------------------------------------------------
  const createSubjectMutation = useMutation({
    mutationFn: ({ id, payload }) => createSubject_POST(id, payload),
    onSuccess: (response, variables) => {
      const newSubject = response?.data;

      queryClient.setQueryData(subjectKeys.single(newSubject.id), newSubject);

      queryClient.setQueryData(
        subjectKeys.timetable(variables.id),
        (oldData) => {
          if (!oldData) return { data: [newSubject] };
          return { ...oldData, data: [...(oldData?.data ?? []), newSubject] };
        },
      );
      toast.success("Subject created successfully.");
    },
    onError: handleError,
  });

  // -------------------------------------------------------------------
  const deleteSubjectMutation = useMutation({
    mutationFn: (id) => deleteSubject_DELETE(id),
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
    onError: (error, id, context) => {
      queryClient.setQueryData(
        subjectKeys.timetable(timetableId),
        context?.previousData,
      );
      handleError(error);
    },
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: subjectKeys.single(variables) });
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
    mutationFn: ({ id, data }) => updateSubject_PATCH(timetableId, id, data),
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
            data:
              oldData?.data?.map((item) =>
                item.id === id ? { ...item, ...data } : item,
              ) ?? [],
          };
        },
      );
      return { previousData };
    },
    onSuccess: (response) => {
      const updatedSubject = response?.data;

      queryClient.setQueryData(
        subjectKeys.single(updatedSubject.id),
        updatedSubject,
      );

      queryClient.setQueryData(
        subjectKeys.timetable(timetableId),
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data:
              oldData?.data?.map((item) =>
                item.id === updatedSubject.id ? updatedSubject : item,
              ) ?? [],
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