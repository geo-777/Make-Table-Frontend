import styles from "./Documentation.module.css";
import { Calendar, ArrowLeft } from "lucide-react";
import { useAuth } from "../../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
const Documentation = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>
              <Calendar size={18} />
            </span>
            <p>MakeTable</p>
          </div>
          <span className={styles.docsIcon__nav}>Docs</span>
        </div>
        <div className={styles.navRight}>
          <button className={`${styles.actinBtn__nav} ${styles.homeBtn}`}>
            <ArrowLeft size={15} strokeWidth={2.25} />
            <p>Home</p>
          </button>
          <button
            onClick={() => {
              if (isAuthenticated) {
                navigate("/dashboard");
              } else {
                navigate("/login");
              }
            }}
            className={styles.actinBtn__nav}
          >
            {isAuthenticated ? "Open app" : "Login"}
          </button>
        </div>
      </nav>
    </main>
  );
};

export default Documentation;
