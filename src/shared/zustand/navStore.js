import { create } from "zustand";
/* handles state for : 
navbar collapses
*/
const useNavStore = create((set) => ({
  navbarCollapsed: false,
  toggleNavbar: () =>
    set((state) => ({ navbarCollapsed: !state.navbarCollapsed })),
  setNavbarCollapsed: (collapsed) => set({ navbarCollapsed: collapsed }),
}));

export default useNavStore;
