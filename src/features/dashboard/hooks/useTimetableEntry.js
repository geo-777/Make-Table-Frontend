import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  getClassTimetable_GET,
  getTeacherTimetable_GET,
} from "../../../api/timetableEntry.api";

export const useTimetableEntry = create(
  immer((set) => ({

    classTimetables: [],
    teacherTimetables: [],
    loading: { class: false, teacher: false },
    error: { class: null, teacher: null },

    fetchClassTimetable: async (classId) => {
      set((state) => {
        state.loading.class = true;
        state.error.class = null;
      });

      try {
        const data = await getClassTimetable_GET(classId);

        set((state) => {
          state.classTimetables = data;
          state.loading.class = false;
        });
      } catch (err) {
        set((state) => {
          state.error.class = err?.message ?? "Failed to fetch class timetable";
          state.loading.class = false;
        });
      }
    },

    fetchTeacherTimetable: async (teacherId) => {
      set((state) => {
        state.loading.teacher = true;
        state.error.teacher = null;
      });

      try {
        const data = await getTeacherTimetable_GET(teacherId);

        set((state) => {
          state.teacherTimetables = data;
          state.loading.teacher = false;
        });
      } catch (err) {
        set((state) => {
          state.error.teacher =
            err?.message ?? "Failed to fetch teacher timetable";
          state.loading.teacher = false;
        });
      }
    },

    clearClassTimetables: () => {
      set((state) => {
        state.classTimetables = [];
        state.error.class = null;
      });
    },

    clearTeacherTimetables: () => {
      set((state) => {
        state.teacherTimetables = [];
        state.error.teacher = null;
      });
    },

    clearAll: () => {
      set((state) => {
        state.classTimetables = [];
        state.teacherTimetables = [];
        state.error = { class: null, teacher: null };
      });
    },
  })),
);
