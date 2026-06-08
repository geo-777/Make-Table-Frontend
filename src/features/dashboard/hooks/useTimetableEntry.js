import { useCallback } from "react";
import {
  getClassTimetable_GET,
  getTeacherTimetable_GET,
} from "../../../api/timetableEntry.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTimetableEntry({ selectedClassId, selectedTeacherId }) {
  const queryClient = useQueryClient();

  //queries
  const {
    data: classTimetablesData,
    error: classError,
    isLoading: isClassPending,
    isSuccess: isClassSuccess,
  } = useQuery({
    queryKey: ["timetables", "class", selectedClassId],
    queryFn: () => getClassTimetable_GET(selectedClassId),
    enabled: selectedClassId != null && selectedClassId !== "",
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const {
    data: teacherTimetableData,
    error: teacherError,
    isLoading: isTeacherPending,
    isSuccess: isTeacherSuccess,
  } = useQuery({
    queryKey: ["timetables", "teacher", selectedTeacherId],
    queryFn: () => getTeacherTimetable_GET(selectedTeacherId),
    enabled: selectedTeacherId != null && selectedTeacherId !== "",
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // entries
  const classTimetables = classTimetablesData?.entries ?? [];
  const teacherTimetables = teacherTimetableData?.entries ?? [];
  const invalidateClassTimetable = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["timetables", "class", selectedClassId],
    });
  }, [queryClient, selectedClassId]);

  const invalidateTeacherTimetable = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["timetables", "teacher", selectedTeacherId],
    });
  }, [queryClient, selectedTeacherId]);

  const refetchTimetables = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["timetables", "class"] });
    queryClient.invalidateQueries({ queryKey: ["timetables", "teacher"] });
  }, [queryClient]);

  return {
    classTimetables,
    teacherTimetables,
    loading: { class: isClassPending, teacher: isTeacherPending },
    error: { class: classError, teacher: teacherError },
    success: { class: isClassSuccess, teacher: isTeacherSuccess },
    fetchClassTimetable: invalidateClassTimetable,
    fetchTeacherTimetable: invalidateTeacherTimetable,
    refetchTimetables,
  };
}
