import styles from "../styles/Classes.module.css";
import { Pencil, Trash2 } from "lucide-react";

// individual grid items.
const GridItem = ({ data }) => {
  const actionbtnSize = 16;
  const actionbtnStroke = 1.75;
  return (
    <div className={styles.gridItem}>
      <div className={styles.gridItem__header}>
        <div className={styles.gridItem__info}>
          <h6>{data.class_name}</h6>
          <p>{data.room_name}</p>
        </div>
        <span
          className={`${styles.typeLabel} ${data.isLab ? styles.typeLab : ""}`}
        >
          {data.isLab ? "Lab" : "Regular"}
        </span>
      </div>

      <div className={styles.gridItem__actionbtns}>
        <button className={styles.actionBtn}>
          <Pencil size={actionbtnSize} strokeWidth={actionbtnStroke} />
          <p>Edit</p>
        </button>
        <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
          <Trash2 size={actionbtnSize} strokeWidth={actionbtnStroke} />
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

/* 
data object structure :
      id: 0,
      class_name: "S1 CSE",
      room_name: "string",
      isLab: false,
      created_at: "2026-04-10T10:44:53.876Z",
*/
const GridView = ({ data }) => {
  return (
    <div className={styles.gridContainer}>
      {data.map((e, i) => (
        <GridItem data={e} key={i} />
      ))}
    </div>
  );
};

export default GridView;
