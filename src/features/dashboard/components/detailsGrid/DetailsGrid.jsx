import styles from "./DetailsGrid.module.css";
import { Table, CircleCheck, Pencil } from "lucide-react";
const DetailsGrid = () => {
  const iconSize = 20;
  const iconStrokeWidth = 2;
  return (
    <div className={styles.detailsGrid}>
      <div className={styles.gridItem}>
        <div className={styles.detailsGrid__icon}>
          <Table size={iconSize} strokeWidth={iconStrokeWidth} />
        </div>
        <div className={styles.detailsGrid__info}>
          <p>Total Timetables</p>
          <h4>1</h4>
        </div>
      </div>
      <div className={styles.gridItem}>
        <div className={`${styles.detailsGrid__icon} ${styles.publishedTb}`}>
          <CircleCheck size={iconSize} strokeWidth={iconStrokeWidth} />
        </div>
        <div className={styles.detailsGrid__info}>
          <p>Published</p>
          <h4>0</h4>
        </div>
      </div>
      <div className={styles.gridItem}>
        <div className={`${styles.detailsGrid__icon} ${styles.draftTb}`}>
          <Pencil size={iconSize} strokeWidth={iconStrokeWidth} />
        </div>
        <div className={styles.detailsGrid__info}>
          <p>Drafts</p>
          <h4>1</h4>
        </div>
      </div>
    </div>
  );
};

export default DetailsGrid;
