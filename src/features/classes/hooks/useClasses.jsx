import {
  fetchAllClasses,
  postClass,
  deleteClass,
  patchClass,
} from "../../../api/classes.api";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiErrorHandler, {
  Component_Type,
} from "../../../shared/utils/apiErrorHandler";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { updateQueryCache } from "../../../shared/utils/queryCacheHelper";
import { toast } from "react-toastify";

const useClasses = () => {
  const { selectedTimetableData } = useTimeTableSelect();

  const timetableId = selectedTimetableData?.id;
  const CLASS_KEY = ["classes", timetableId];
  const queryClient = useQueryClient();

  /*QUERY*/

  const query = useQuery({
    queryKey: CLASS_KEY,

    queryFn: () => fetchAllClasses(timetableId),

    enabled: !!timetableId,

    staleTime: 5 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });

  /* CREATE*/

  const createListing = useMutation({
    mutationFn: (data) => {
      return postClass(timetableId, data);
    },

    onSuccess: (response) => {
      const newClass = response.data;

      updateQueryCache({
        queryClient,
        queryKey: CLASS_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: [...oldData.data, newClass],
        }),
      });

      toast.success("Class created successfully.");
    },

    onError: (error) => {
      apiErrorHandler(error?.response?.status, Component_Type.CLASSES);
    },
  });

  /* DELETE*/

  const deleteListing = useMutation({
    mutationFn: (classId) => deleteClass(classId),

    onSuccess: (_, classId) => {
      updateQueryCache({
        queryClient,
        queryKey: CLASS_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: oldData.data.filter((e) => e.id !== classId),
        }),
      });

      toast.success("Class deleted.");
    },

    onError: (error) => {
      apiErrorHandler(error?.response?.stus, Component_Type.CLASSES);
    },
  });

  /*PATCH*/

  const patchListing = useMutation({
    mutationFn: ({ classId, data }) => patchClass(timetableId, classId, data),
    onSuccess: (response, { classId }) => {
      const updatedClass = response.data;
      updateQueryCache({
        queryClient,
        queryKey: CLASS_KEY,
        updateFn: (oldData) => ({
          ...oldData,
          data: oldData.data.map((e) => (e.id === classId ? updatedClass : e)),
        }),
      });
      toast.success("Class updated.");
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

export default useClasses;
