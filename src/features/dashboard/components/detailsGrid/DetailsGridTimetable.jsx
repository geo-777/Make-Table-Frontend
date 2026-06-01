import styles from "./DetailsGrid.module.css";
import { GraduationCap, LibraryBig, Users } from "lucide-react";
const DetailsGridTimetable = ({ classes, teachers, subjects }) => {
  const iconSize = 20;
  const iconStrokeWidth = 2;
  return (
    <div className={styles.detailsGrid}>
      <div className={styles.gridItem}>
        <div className={`${styles.detailsGrid__icon} ${styles.classesTb}`}>
          <GraduationCap size={iconSize} strokeWidth={iconStrokeWidth} />
        </div>
        <div className={styles.detailsGrid__info}>
          <p>Classes</p>
          <h4>{classes ?? "—"}</h4>
        </div>
      </div>
      <div className={styles.gridItem}>
        <div className={`${styles.detailsGrid__icon} ${styles.teachersTb}`}>
          <Users size={iconSize} strokeWidth={iconStrokeWidth} />
        </div>
        <div className={styles.detailsGrid__info}>
          <p>Teachers</p>
          <h4>{teachers ?? "—"}</h4>{" "}
        </div>
      </div>
      <div className={styles.gridItem}>
        <div className={`${styles.detailsGrid__icon} ${styles.draftTb}`}>
          <LibraryBig size={iconSize} strokeWidth={iconStrokeWidth} />
        </div>
        <div className={styles.detailsGrid__info}>
          <p>Subjects</p>
          <h4>{subjects ?? "—"}</h4>
        </div>
      </div>
    </div>
  );
};

export default DetailsGridTimetable;
