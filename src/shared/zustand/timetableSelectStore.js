import { create } from "zustand";

// this handles setting and storing timetable (basically the workspace selector logic.)
const useTimeTableSelect = create((set) => ({
  selectedTimetableData: null,

  selectTimeTableData: (id) => set({ selectedTimetableData: id }),
}));

export default useTimeTableSelect;
