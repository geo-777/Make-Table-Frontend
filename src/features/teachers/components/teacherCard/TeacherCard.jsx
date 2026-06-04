import styles from "./TeacherCard.module.css";
import ItemCard from "../../../../shared/components/itemCard/ItemCard";

export default function TeacherCard({
  id,
  name = "Default",
  maxPerDay = 4,
  maxPerWeek = 18,
  consecutive = 3,
  onEdit,
  onDelete,
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ItemCard
      onEdit={onEdit}
      onDelete={() => onDelete(id)}
    >
       <div className={styles.header}>
        <div className={styles.avatar}>
          <span className={styles.avatarText}>{initials}</span>
        </div>
        <h3 className={styles.name}>{name}</h3>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <p className={styles.statValue}>{maxPerDay}</p>
          <p className={styles.statLabel}>Max/Day</p>
        </div>
        <div className={styles.statItem}>
          <p className={styles.statValue}>{maxPerWeek}</p>
          <p className={styles.statLabel}>Max/Week</p>
        </div>
        <div className={styles.statItem}>
          <p className={styles.statValue}>{consecutive}</p>
          <p className={styles.statLabel}>Consec.</p>
        </div>
      </div>
    </ItemCard>
  );
}
