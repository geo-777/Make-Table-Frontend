import { Monitor, Moon, Shield, User } from "lucide-react";
import styles from "../styles/Settings.module.css";

const iconMap = {
  profile: User,
  password: Shield,
  appearance: Monitor,
  danger: Moon,
};

const SettingsNav = ({ tabs, active, onSelect }) => {
  return (
    <aside className={styles.settingsSidebar}>
      <span className={styles.sidebarTitle}>Sections</span>
      <div className={styles.navList}>
        {tabs.map((tab) => {
          const Icon = iconMap[tab.id] ?? User;
          const activeClass = active === tab.id ? styles.navItemActive : "";
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.navItem} ${activeClass}`}
              onClick={() => onSelect(tab.id)}
            >
              <span className={styles.navItemIcon}>
                <Icon size={16} />
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default SettingsNav;
