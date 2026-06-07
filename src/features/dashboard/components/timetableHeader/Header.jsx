import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { Play, Zap } from "lucide-react";

const COOLDOWN_MS = 60_000;

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

  const [countdown, setCountdown] = useState(() => {
    const time = localStorage.getItem("lastTime");
    if (!time) return 0;
    const elapsed = Date.now() - Number(time);
    const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
    return remaining > 0 ? remaining : 0;
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [countdown > 0]);

  const handleGeneration = ({ force }) => {
    localStorage.setItem("lastTime", Date.now());
    setCountdown(COOLDOWN_MS / 1000);
    if (force) onForce();
    else onGenerate();
  };

  return (
    <div className={`${styles.wrapper} stagger-children`}>
      <div className={styles.info}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.meta}>
          <span
            className={`${styles.badge} ${
              isGenerating
                ? styles.violet
                : viewStatus === "Public"
                  ? styles.green
                  : ""
            }`}
          >
            <span className={styles.dot} />
            {viewStatus}
          </span>
          <span className={styles.metaText}>
            {days} days · {slots} slots/day · {classes} classes
          </span>
        </div>
      </div>

      {countdown > 0 && (
        <div className={styles.timerWrapper}>
          Generate new timetable in{" "}
          <span>
            {Math.floor(countdown / 60)}:
            {String(countdown % 60).padStart(2, "0")}
          </span>
        </div>
      )}

      <div className={styles.actions} style={{ marginLeft: countdown <= 0 ? "auto" : 0}}>
        <button
          className={styles.btnPrimary}
          onClick={() => handleGeneration({ force: false })}
          disabled={isGenerating || countdown > 0}
        >
          <Play size={16} />
          {isGenerating ? "Generating..." : "Generate"}
        </button>
        <button
          className={styles.btnOutline}
          disabled={isGenerating || countdown > 0}
          onClick={() => handleGeneration({ force: true })}
        >
          <Zap size={16} />
          Force
        </button>
      </div>
    </div>
  );
};

export default Header;