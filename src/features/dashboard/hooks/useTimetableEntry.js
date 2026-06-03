import { useState, useCallback, useEffect } from "react";
import {
  getClassTimetable_GET,
  getTeacherTimetable_GET,
} from "../../../api/timetableEntry.api";

export function useTimetableEntry() {
  const [classTimetables, setClassTimetables] = useState([]);
  const [teacherTimetables, setTeacherTimetables] = useState([]);
  const [loading, setLoading] = useState({ class: false, teacher: false });
  const [error, setError] = useState({ class: null, teacher: null });

  const fetchClassTimetable = useCallback(async (classId) => {
    setLoading((prev) => ({ ...prev, class: true }));
    setError((prev) => ({ ...prev, class: null }));
    try {
      const res = await getClassTimetable_GET(classId);

      console.log(res.entries);

      setClassTimetables(res.entries);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        class: err?.message ?? "Failed to fetch class timetable",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, class: false }));
    }
  }, []);

  const fetchTeacherTimetable = useCallback(async (teacherId) => {
    setLoading((prev) => ({ ...prev, teacher: true }));
    setError((prev) => ({ ...prev, teacher: null }));
    try {
      const res = await getTeacherTimetable_GET(teacherId);
      setTeacherTimetables(res.entries);
    } catch (err) {
      setError((prev) => ({
        ...prev,
        teacher: err?.message ?? "Failed to fetch teacher timetable",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, teacher: false }));
    }
  }, []);

  const clearClassTimetables = useCallback(() => {
    setClassTimetables([]);
    setError((prev) => ({ ...prev, class: null }));
  }, []);

  const clearTeacherTimetables = useCallback(() => {
    setTeacherTimetables([]);
    setError((prev) => ({ ...prev, teacher: null }));
  }, []);

  const clearAll = useCallback(() => {
    setClassTimetables([]);
    setTeacherTimetables([]);
    setError({ class: null, teacher: null });
  }, []);

  useEffect(() => {
    console.log(classTimetables);
  }, [classTimetables])

  return {
    classTimetables,
    teacherTimetables,
    loading,
    error,
    fetchClassTimetable,
    fetchTeacherTimetable,
    clearClassTimetables,
    clearTeacherTimetables,
    clearAll,
  };
}
