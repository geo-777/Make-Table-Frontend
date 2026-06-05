import styles from "./SubjectCard.module.css";
import ItemCard from "../../../../shared/components/itemCard/ItemCard";
import { Badge } from "lucide-react";

export default function SubjectCard({
  subject,
  onEdit,
  onDelete,
}) {

  return (
    <ItemCard onEdit={onEdit} onDelete={() => onDelete(subject.id)}>
      <div className={styles.header}>
        <div className={styles.name}>
          <Badge
            size={24}
            style={{ fill: subject.rgb_code, stroke: subject.rgb_code }}
          />
          {subject.name}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
          {subject.isLab && (
            <button
              className={`${styles.badge} ${styles.primary}`}
              style={{ border: "none" }}
            >
              {`${subject.lab_classes.length} ${subject.lab_classes.length > 1 ? "classes" : "class"}`}
            </button>
          )}

          <div
            className={`${styles.badge} ${subject.isLab ? styles.primary : ""}`}
          >
            {subject.isLab ? "Lab" : "Theory"}
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <p
            className={styles.statValue}
          >{`${subject.min_classes_day}-${subject.max_classes_day}`}</p>
          <p className={styles.statLabel}>Daily</p>
        </div>
        <div className={styles.statItem}>
          <p
            className={styles.statValue}
          >{`${subject.min_classes_week}-${subject.max_classes_week}`}</p>
          <p className={styles.statLabel}>Weekly</p>
        </div>
        <div className={styles.statItem}>
          <p
            className={styles.statValue}
          >{`${subject.min_classes_consecutive}-${subject.max_classes_consecutive}`}</p>
          <p className={styles.statLabel}>Consec.</p>
        </div>
      </div>
    </ItemCard>
  );
}