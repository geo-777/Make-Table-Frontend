import styles from "../../styles/PublicTimetables.module.css";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <span className={styles.logoIcon}>
          <Calendar size={18} />
        </span>
        <p>MakeTable</p>
      </div>
      <div className={styles.actionBtns__nav}>
        <button
          className={`${styles.secondaryBtn} ${styles.btn}`}
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button className={styles.btn} onClick={() => navigate("/login")}>
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
