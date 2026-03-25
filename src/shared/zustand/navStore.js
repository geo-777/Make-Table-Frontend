import { create } from "zustand";
/* handles state for : 
navbar collapses
also mobile nav
*/
const useNavStore = create((set) => ({
  navbarCollapsed: false,
  mobileNavOpen: false,
  toggleNavbar: () =>
    set((state) => ({ navbarCollapsed: !state.navbarCollapsed })),
  toggleMobileNav: () =>
    set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  setNavbarCollapsed: (collapsed) => set({ navbarCollapsed: collapsed }),
  setMobNav: (open) => set({ mobileNavOpen: open }),
}));

export default useNavStore;
