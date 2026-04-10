import { create } from "zustand";
import { persist } from "zustand/middleware";

// this is used for changing view
// persist is used localstorage persistense
export const useClassesView = create(
  persist(
    (set) => ({
      activeView: "grid",
      setActiveView: (view) => set({ activeView: view }),
    }),
    { name: "classListingsView" }, //unique id in lstorage nigga.. dont repeat this shit
  ),
);
