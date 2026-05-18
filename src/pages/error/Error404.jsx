import { useNavigate } from "react-router-dom";
import styles from "./Error404.module.css";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.codeWrapper}>
          <span className={styles.four}>4</span>
          <div className={styles.zeroWrapper}>
            <div className={styles.zero}>
            </div>
          </div>
          <span className={styles.four}>4</span>
        </div>

        <div className={styles.divider} />

        <h1 className={styles.heading}>Page not found</h1>
        <p className={styles.subtext}>
          The page you're looking for doesn't exist, was moved, or the URL might
          be mistyped.
        </p>

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={() => navigate(-1)}>
            Go back
          </button>
          <button className={styles.btnPrimary} onClick={() => navigate("/")}>
            Go home
          </button>
        </div>

        <p className={styles.errorCode}>Error code: 404</p>
      </div>
    </div>
  );
}