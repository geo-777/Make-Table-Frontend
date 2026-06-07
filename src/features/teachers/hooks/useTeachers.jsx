import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useToast } from "../../../shared/components/toast/Toast";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import {
  createTeacher_POST,
  fetchAllTeachers_GET,
  updateTeachers_PATCH,
  deleteTeacher_DELETE,
} from "../../../api/teachers.api";

// --- Keys --------------------------------------------
export const teacherKeys = {
  all: ["teachers"],
  timetable: (id) => ["teachers", id],
  single: (id) => ["teachers", "single", id],
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

// --- Hook --------------------------------------------
const useTeachers = () => {
  const queryClient = useQueryClient();
  const { selectedTimetableData } = useTimeTableSelect();
  const timetableId = selectedTimetableData?.id;
  const { addToast } = useToast();

  const teacherQuery = useQuery({
    queryKey: teacherKeys.timetable(timetableId),
    queryFn: () => fetchAllTeachers_GET(timetableId),
    enabled: Boolean(timetableId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // -------------------------------------------------------------------
  const createTeacherMutation = useMutation({
    mutationFn: ({ id, data }) => createTeacher_POST(id, data),
    onSuccess: (response, variables) => {
      const newTeacher = response?.data;

      queryClient.setQueryData(teacherKeys.single(newTeacher.id), newTeacher);

      queryClient.setQueryData(
        teacherKeys.timetable(variables.id),
        (oldData) => {
          if (!oldData) return { data: [newTeacher] };
          return { ...oldData, data: [...(oldData?.data ?? []), newTeacher] };
        },
      );

      addToast({
        type: "success",
        title: "Teacher created successfully.",
        message: "",
        duration: 2000,
      });
    },
    onError: handleError,
  });

  // -------------------------------------------------------------------
  const deleteTeacherMutation = useMutation({
    mutationFn: (id) => deleteTeacher_DELETE(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: teacherKeys.timetable(timetableId),
      });
      const previousData = queryClient.getQueryData(
        teacherKeys.timetable(timetableId),
      );
      queryClient.setQueryData(
        teacherKeys.timetable(timetableId),
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
        teacherKeys.timetable(timetableId),
        context?.previousData,
      );
      handleError(error);
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: teacherKeys.single(id) });
      addToast({
        type: "success",
        title: "Teacher deleted successfully.",
        message: "",
        duration: 2000,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: teacherKeys.timetable(timetableId),
      });
    },
  });

  // -------------------------------------------------------------------
  const updateTeacherMutation = useMutation({
    mutationFn: ({ id, data }) => updateTeachers_PATCH(timetableId, id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: teacherKeys.timetable(timetableId),
      });
      const previousData = queryClient.getQueryData(
        teacherKeys.timetable(timetableId),
      );
      queryClient.setQueryData(
        teacherKeys.timetable(timetableId),
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
      const updatedTeacher = response?.data;

      queryClient.setQueryData(
        teacherKeys.single(updatedTeacher.id),
        updatedTeacher,
      );

      queryClient.setQueryData(
        teacherKeys.timetable(timetableId),
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data:
              oldData?.data?.map((item) =>
                item.id === updatedTeacher.id ? updatedTeacher : item,
              ) ?? [],
          };
        },
      );

      addToast({
        type: "success",
        title: "Teacher updated successfully.",
        message: "",
        duration: 2000,
      });
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        teacherKeys.timetable(timetableId),
        context?.previousData,
      );
      handleError(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: teacherKeys.timetable(timetableId),
      });
    },
  });

  // -------------------------------------------------------------------
  return {
    ...teacherQuery,
    createTeacher: createTeacherMutation,
    deleteTeacher: deleteTeacherMutation,
    updateTeacher: updateTeacherMutation,
  };
};

export default useTeachers;