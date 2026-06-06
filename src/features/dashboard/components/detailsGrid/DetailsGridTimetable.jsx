import styles from "./DetailsGrid.module.css";
import { GraduationCap, LibraryBig, Users } from "lucide-react";
const DetailsGridTimetable = ({ classes, teachers, subjects }) => {
  const iconSize = 20;
  const iconStrokeWidth = 2;

  const details = [
    {
      label: "Classes",
      style: styles.classesTb,
      icon: GraduationCap,
      value: classes,
    },
    {
      label: "Teachers",
      style: styles.teachersTb,
      icon: Users,
      value: teachers,
    },
    {
      label: "Subjects",
      style: styles.draftTb,
      icon: LibraryBig,
      value: subjects,
    },
  ];

  return (
    <div
      className={`${styles.detailsGrid} stagger-children ${styles.deteilsGridTimetable}`}
    >
      {details.map((item, i) => (
        <div key={i} className={styles.gridItem}>
          <div className={`${styles.detailsGrid__icon} ${item.style}`}>
            <item.icon size={iconSize} strokeWidth={iconStrokeWidth} />
          </div>
          <div className={styles.detailsGrid__info}>
            <p>{item.label}</p>
            <h4>{item.value ?? "—"}</h4>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsGridTimetable;
