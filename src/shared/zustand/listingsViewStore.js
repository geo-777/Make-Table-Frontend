import { create } from "zustand";
import { persist } from "zustand/middleware";

// reusable view store creator
const createViewStore = (defaultView, storageKey) =>
  create(
    persist(
      (set) => ({
        activeView: defaultView,

        setActiveView: (view) =>
          set({
            activeView: view,
          }),
      }),
      {
        name: storageKey,
      },
    ),
  );

// stores
export const useClassesView = createViewStore("grid", "classListingsView");

export const useAssignmentsView = createViewStore(
  "list",
  "assignmentsListingView",
);

export const useTeachersView = createViewStore("grid", "teacherListingsView");

export const useSubjectsView = createViewStore("grid", "subjectListingsView");
