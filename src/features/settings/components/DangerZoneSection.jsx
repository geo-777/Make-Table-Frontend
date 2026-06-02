import { LogOut, Trash2 } from "lucide-react";
import styles from "../styles/Settings.module.css";
import { useAuth } from "../../../app/providers/AuthProvider";

const DangerZoneSection = () => {
  const { logout } = useAuth();

  const logoutHandler = async () => {
    await logout();
  };
  return (
    <section
      id="danger"
      className={`${styles.sectionCard} ${styles.dangerSectionCard}`}
    >
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Danger zone</h2>
          <p className={styles.sectionDesc}>
            Irreversible actions for this device.
          </p>
        </div>
      </div>

      <div className={styles.dangerSplit}>
        <div className={styles.dangerItem}>
          <div>
            <p className={styles.dangerTextTitle}>Sign out</p>
            <p className={styles.dangerTextDesc}>
              End your session on this device.
            </p>
          </div>
          <button
            className={`${styles.btn} ${styles.btnSecondary} `}
            type="button"
            onClick={logoutHandler}
          >
            <LogOut size={16} style={{ marginRight: "0.5rem" }} /> Sign out
          </button>
        </div>

        <div className={styles.dangerItem}>
          <div>
            <p className={styles.dangerTextTitle}>Delete all local data</p>
            <p className={styles.dangerTextDesc}>
              Removes timetables, preferences and session from this device.
            </p>
          </div>
          <button
            className={`${styles.btn} ${styles.btnDanger} ${styles.dangerBtn}`}
            type="button"
          >
            <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Delete data
          </button>
        </div>
      </div>
    </section>
  );
};

export default DangerZoneSection;
