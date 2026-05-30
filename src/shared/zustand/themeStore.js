import { create } from "zustand";
import { persist } from "zustand/middleware";

const getSystemTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "light",
      themeMode: "light",
      setThemeMode: (themeMode) => {
        const theme = themeMode === "system" ? getSystemTheme() : themeMode;
        set({ themeMode, theme });
      },
      syncSystemTheme: () => {
        if (get().themeMode === "system") {
          set({ theme: getSystemTheme() });
        }
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.themeMode === "system") {
          state.setThemeMode("system");
        }
      },
    },
  ),
);

export default useThemeStore;
