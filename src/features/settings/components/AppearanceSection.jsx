import { useEffect } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import useThemeStore from "../../../shared/zustand/themeStore";
import styles from "../styles/Settings.module.css";

const options = [
  { key: "light", label: "Light", description: "Always light", Icon: Sun },
  { key: "dark", label: "Dark", description: "Always dark", Icon: Moon },
  {
    key: "system",
    label: "System",
    description: "Match your OS",
    Icon: Monitor,
  },
];

const AppearanceSection = () => {
  const { themeMode, theme, setThemeMode, syncSystemTheme } = useThemeStore();

  useEffect(() => {
    if (themeMode === "system") {
      syncSystemTheme();
    }
  }, [themeMode, syncSystemTheme]);

  return (
    <section id="appearance" className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Appearance</h2>
          <p className={styles.sectionDesc}>
            Choose how MakeTable looks on this device.
          </p>
        </div>
      </div>

      <div className={styles.themeSection}>
        <div>
          <span className={styles.fieldLabel}>Theme</span>
          <div className={styles.themeSelector}>
            {options.map((option) => {
              const active = themeMode === option.key;
              const Icon = option.Icon;
              return (
                <button
                  type="button"
                  key={option.key}
                  onClick={() => setThemeMode(option.key)}
                  className={`${styles.themeCard} ${active ? styles.themeCardActive : ""}`}
                >
                  <span className={styles.themeIcon}>
                    <Icon size={18} />
                  </span>
                  <p className={styles.themeName}>{option.label}</p>
                  <p className={styles.themeNote}>{option.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {themeMode === "system" && (
          <p className={styles.systemNote}>
            The current system theme is <strong>{theme}</strong>. MakeTable will
            follow this device preference while System is selected.
          </p>
        )}
      </div>
    </section>
  );
};

export default AppearanceSection;
