import styles from "./ImportDialog.module.css";
import { useEffect, useRef } from "react";
import {
  FileSpreadsheet,
  TypeIcon,
  GitBranch,
  InfoIcon,
  X
} from "lucide-react";

export default function ImportDialog({
  open,
  onClose,
  title,
  description,
  onSelectCSV,
  onSelectText,
  onSelectTimetable,
}) {
  const overlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-dialog-title"
      >
        <div className={styles.header}>
          <h2 id="import-dialog-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.body}>
          <div className={styles.cardGrid}>
            <button
              className={`${styles.card} ${styles.cardPrimary}`}
              onClick={onSelectCSV}
            >
              <div className={styles.cardHeader}>
                <span
                  className={`${styles.cardIcon} ${styles.cardIconPrimary}`}
                >
                  <FileSpreadsheet />
                </span>
                <span className={styles.cardLabel}>CSV File</span>
              </div>
              <span className={styles.badge}>RECOMMENDED</span>
              <p className={styles.cardDesc}>
                Upload from Excel, Google Sheets, or CSV
              </p>
            </button>

            <button className={styles.card} onClick={onSelectText}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <TypeIcon />
                </span>
                <span className={styles.cardLabel}>Text Import</span>
              </div>
              <p className={`${styles.cardDesc} ${styles.cardDescBottom}`}>
                Paste names directly, one per line
              </p>
            </button>

            <button className={styles.card} onClick={onSelectTimetable}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <GitBranch />
                </span>
                <span className={styles.cardLabel}>Timetable</span>
              </div>
              <p className={`${styles.cardDesc} ${styles.cardDescBottom}`}>
                Import from another timetable
              </p>
            </button>
          </div>

          <div className={styles.infoBox}>
            <span className={styles.infoIcon}>
              <InfoIcon />
            </span>
            <div className={styles.infoText}>
              <p className={styles.infoHeading}>
                How to Export from Excel or Google Sheets
              </p>
              <p>
                • <span className={styles.infoStrong}>Excel:</span> File → Save
                As → Choose "CSV (Comma delimited)" format
              </p>
              <p>
                • <span className={styles.infoStrong}>Google Sheets:</span> File
                → Download → Comma-separated values (.csv)
              </p>
              <p>
                • Your CSV should have columns for teacher, class, and subject
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerHint}>Choose an import method</p>
          <div className={styles.footerActions}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>

        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={16}/>
        </button>
      </div>
    </div>
  );
}
