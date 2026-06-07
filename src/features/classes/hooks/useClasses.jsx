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
import { useToast } from "../../../shared/components/toast/Toast";

const useClasses = () => {
  const { selectedTimetableData } = useTimeTableSelect();

  const timetableId = selectedTimetableData?.id;
  const CLASS_KEY = ["classes", timetableId];
  const queryClient = useQueryClient();
  const { addToast } = useToast();

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

      addToast({
        type: "success",
        title: "Class created successfully.",
        message: "",
        duration: 2000,
      });
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

      addToast({
        type: "success",
        title: "Class deleted successfully.",
        message: "",
        duration: 2000,
      });
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

      addToast({
        type: "success",
        title: "Class updated successfully.",
        message: "",
        duration: 2000,
      });
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
