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

  return {
    ...query,
    createListing,
  };
};

export default useAssignments;
