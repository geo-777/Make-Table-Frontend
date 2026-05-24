import styles from "./ItemCard.module.css";
import {
  Pencil,
  Trash2
} from "lucide-react";

export default function ItemCard({
  children,
  id,
  onEdit,
  onDelete,
}) {

  return (
    <div className={styles.itemCard}>
      {children}
      <div className={styles.actionBtns}>
        <button
          className={styles.actionBtn}
          onClick={() => onEdit}
        >
          <Pencil size={16} strokeWidth={1.75} />
          <p>Edit</p>
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={onDelete}
        >
          <Trash2 size={16} strokeWidth={1.75} />
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
}