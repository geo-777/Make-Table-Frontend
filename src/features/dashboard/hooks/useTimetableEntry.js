import { useState, useCallback, useEffect } from "react";
import {
  getClassTimetable_GET,
  getTeacherTimetable_GET,
} from "../../../api/timetableEntry.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTimetableEntry({ selectedClassId, selectedTeacherId }) {
  //status states
  const [loading, setLoading] = useState({ class: false, teacher: false });
  const [error, setError] = useState({ class: null, teacher: null });
  const [success, setSuccess] = useState({ class: false, teacher: false });
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
    enabled: !!selectedClassId,
    staleTime: 5 * 60 * 1000,
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
    enabled: !!selectedTeacherId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // entries
  const classTimetables = classTimetablesData?.entries ?? [];
  const teacherTimetables = teacherTimetableData?.entries ?? [];
  //handling error and loading states
  useEffect(() => {
    setError({ teacher: teacherError, class: classError });
  }, [classError, teacherError]);
  useEffect(() => {
    setLoading({ teacher: isTeacherPending, class: isClassPending });
  }, [isClassPending, isTeacherPending]);

  useEffect(() => {
    setSuccess({ teacher: isTeacherSuccess, class: isClassSuccess });
  }, [isClassSuccess, isTeacherSuccess]);

  //invalidating query
  const fetchClassTimetable = () => {
    queryClient.invalidateQueries({
      queryKey: ["timetables", "class", selectedClassId],
    });
  };

  const fetchTeacherTimetable = () => {
    queryClient.invalidateQueries({
      queryKey: ["timetables", "teacher", selectedTeacherId],
    });
  };

  //this is for invalidating all queries and refetching
  //this is used while generating to clear previous entry data
  const refetchTimetables = () => {
    queryClient.invalidateQueries({
      queryKey: ["timetables", "class"],
    });

    queryClient.invalidateQueries({
      queryKey: ["timetables", "teacher"],
    });
  };

  console.log(error);
  return {
    classTimetables,
    teacherTimetables,
    loading,
    error,
    fetchTeacherTimetable,
    fetchClassTimetable,
    refetchTimetables,
    success,
  };
}
