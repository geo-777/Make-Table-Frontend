import styles from "./Topbar.module.css";
import { PanelLeft } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
const Topbar = ({ page }) => {
  const { user } = useAuth();
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <span className={styles.navToggle}>
          <PanelLeft size={17} />
        </span>
        <p>{page}</p>
      </div>
      <div className={styles.right}>
        <p className={styles.profileIcon}>{user.slice(0, 2).toUpperCase()}</p>
      </div>
    </div>
  );
};

export default Topbar;
