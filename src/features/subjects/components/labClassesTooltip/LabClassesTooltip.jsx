import styles from "./LabClassesTooltip.module.css";
import { useState, useEffect, useRef } from "react";
import LabClassDialog from "../labClassDialog/LabClassDialog";

export default function LabClassesTooltip({ labClasses }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const [openLabClassDialog, setOpenLabClassDialog] = useState(false);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setVisible(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!labClasses || labClasses.length === 0) {
    return <span className={styles.labEmpty}>—</span>;
  }

  return (
    <>
      <span ref={ref} className={styles.labBadgeWrapper}>
        <button
          className={styles.labBadge}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          onClick={() => setOpenLabClassDialog(true)}
          aria-label={`${labClasses.length} lab classes assigned`}
        >
          {labClasses.length} class{labClasses.length !== 1 ? "es" : ""}
        </button>

        {visible && (
          <div className={styles.tooltip}>
            {labClasses.map((c) => (
              <div key={c.id} className={styles.tooltipRow}>
                <span className={styles.tooltipClass}>{c.class_name}</span>
                <span className={styles.tooltipRoom}>{c.room_name}</span>
              </div>
            ))}
          </div>
        )}
      </span>

      <LabClassDialog
        isOpen={openLabClassDialog}
        labClasses={labClasses}
        onClose={() => setOpenLabClassDialog(false)}
        onSave={() => {}}
      />
    </>
  );
}