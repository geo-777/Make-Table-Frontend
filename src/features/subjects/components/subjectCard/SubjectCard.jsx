import styles from "./SubjectCard.module.css";
import ItemCard from "../../../../shared/components/itemView/itemCard/ItemCard";
import { useState } from "react";
import LabClassDialog from "../labClassDialog/LabClassDialog";

export default function SubjectCard({
  subject,
  onEdit,
  onDelete,
}) {

  const [openLabClassDialog, setOpenLabClassDialog] = useState(false);

  return (
    <ItemCard onEdit={onEdit} onDelete={() => onDelete(subject.id)}>
      <div className={styles.header}>
        <div className={styles.name}>{subject.name}</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
          {!subject.isLab && (
            <button
              className={`${styles.badge} ${styles.primary}`}
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => setOpenLabClassDialog(true)}
            >
              {`${subject.lab_classes.length} Lab ${subject.lab_classes.length > 1 ? "classes" : "class"}`}
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

        <LabClassDialog 
          isOpen={openLabClassDialog}
          onClose={() => setOpenLabClassDialog(false)}
          onSave={() => {}}
          labClasses={[]}
          selectedIds={subject.lab_classes.map((l) => l.id)}
          subjectName={subject.name}
        />
      </div>
    </ItemCard>
  );
}