import styles from "./Header.module.css";
import {
  Play,
  Zap,
} from "lucide-react";

const Header = ({
  name,
  days,
  slots,
  classes,
  viewStatus,
  isGenerating,
  onGenerate,
  onForce,
}) => {
  return (
    <div className={`${styles.wrapper} stagger-children`}>
      <div className={styles.info}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.meta}>
          <span
            className={`${styles.badge} ${isGenerating ? styles.violet : viewStatus === "Public" ? styles.green : ""}`}
          >
            <span className={styles.dot} />
            {viewStatus}
          </span>
          <span className={styles.metaText}>
            {days} days · {slots} slots/day · {classes} classes
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.btnPrimary}
          onClick={onGenerate}
          disabled={isGenerating}
        >
          <Play size={16} />
          {isGenerating ? "Generating..." : "Generate"}
        </button>

        <button
          className={styles.btnOutline}
          disabled={isGenerating}
          onClick={onForce}
        >
          <Zap size={16} />
          Force
        </button>
      </div>
    </div>
  );
};

export default Header;