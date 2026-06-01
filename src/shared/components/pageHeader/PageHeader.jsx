import styles from "./PageHeader.module.css";
import { Plus, Download, List, Grid2x2 } from "lucide-react";

export default function PageHeader({
  title,
  description,
  addButtonText,
  activeView,
  onChangeActiveView,
  onAdd,
  onBulkImport,
}) {
  return (
    <header className={styles.header}>
      <div className={`fadeInUp fast  ${styles.headings}`}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.secondaryBtnsContainer}>
          <div className={`${styles.viewChangerContainer} fadeInUp fast`}>
            <span
              onClick={() => onChangeActiveView("list")}
              className={`${styles.viewChangeBtn} ${activeView === "list" ? styles.viewActive : ""} `}
            >
              <List size={18} strokeWidth={2} />
            </span>
            <span
              onClick={() => onChangeActiveView("grid")}
              className={`${styles.viewChangeBtn} ${activeView === "grid" ? styles.viewActive : ""} `}
            >
              <Grid2x2 size={18} strokeWidth={2} />
            </span>
          </div>
          <button
            className={`${styles.secondaryBtn} fadeInUp fast`}
            onClick={onBulkImport}
          >
            {" "}
            <Download strokeWidth={1.7} size={18} /> <p>Import</p>{" "}
          </button>
        </div>

        <button
          className={`${styles.primary} fadeInUp fast ${styles.addBtn}`}
          onClick={onAdd}
        >
          <Plus strokeWidth={2} /> <p>{addButtonText}</p>{" "}
        </button>
      </div>
    </header>
  );
}
