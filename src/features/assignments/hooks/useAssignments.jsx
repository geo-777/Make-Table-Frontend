import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiErrorHandler, {
  Component_Type,
} from "../../../shared/utils/apiErrorHandler";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { updateQueryCache } from "../../../shared/utils/queryCacheHelper";
import { toast } from "react-toastify";
import {
  fetchAllAssignments,
  postAssignment,
  deleteAssignment,
  patchAssignment,
} from "../../../api/assignments.api";
import { useMemo } from "react";

const useAssignments = () => {
  const { selectedTimetableData } = useTimeTableSelect();

  const timetableId = selectedTimetableData?.id;
  const ASSIGN_KEY = useMemo(() => ["assignments", timetableId], [timetableId]);
  const queryClient = useQueryClient();

  /*QUERY*/

  const query = useQuery({
    queryKey: ASSIGN_KEY,

    queryFn: () => fetchAllAssignments(timetableId),

    enabled: !!timetableId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  /* CREATE*/

  const createListing = useMutation({
    mutationFn: (data) => {
      return postAssignment(data);
    },

    onSuccess: (response) => {
      const newAssign = response.data;

      updateQueryCache({
        queryClient,
        queryKey: ASSIGN_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: [...oldData.data, newAssign],
        }),
      });

      toast.success("Assignment created successfully.");
    },

    onError: (error) => {
      apiErrorHandler(error?.response?.status, Component_Type.ASSIGNMENTS);
    },
  });

  /* DELETE*/
  const deleteListing = useMutation({
    mutationFn: (assignId) => deleteAssignment(assignId),

    onSuccess: (_, assignId) => {
      updateQueryCache({
        queryClient,
        queryKey: ASSIGN_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: oldData.data.filter((e) => e.id !== assignId),
        }),
      });

      toast.success("Assignment deleted.");
    },

    onError: (error) => {
      apiErrorHandler(error?.response?.stus, Component_Type.ASSIGNMENTS);
    },
  });

  /*PATCH*/

  const patchListing = useMutation({
    mutationFn: ({ id, data }) => patchAssignment(id, data),
    onSuccess: (response, { id }) => {
      const updatedAssignment = response.data;
      updateQueryCache({
        queryClient,
        queryKey: ASSIGN_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: oldData.data.map((e) => (e.id === id ? updatedAssignment : e)),
        }),
      });
      toast.success("Assignment updated.");
    },
    onError: (error) => {
      apiErrorHandler(error?.response?.stus, Component_Type.CLASSES);
    },
  });

  return {
    ...query,
    createListing,
    deleteListing,
    patchListing,
  };
};

export default useAssignments;
