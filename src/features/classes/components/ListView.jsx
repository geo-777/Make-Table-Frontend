import styles from "../styles/Classes.module.css";
import { Pencil, Trash2 } from "lucide-react";

const Row = ({ data }) => {
  const actionbtnSize = 16;
  const actionbtnStroke = 2;
  return (
    <>
      <div className={styles.listItem}>{data.class_name}</div>
      <div className={styles.listItem}>{data.room_name}</div>
      <div className={`${styles.listItem} `}>
        <span
          className={`${styles.typeLabel} ${data.isLab ? styles.typeLab : ""}`}
        >
          {data.isLab ? "Lab" : "Regular"}
        </span>
      </div>
      <div className={`${styles.listItem} ${styles.listItem__actionBtns}`}>
        <button className={styles.actionBtn__list}>
          <Pencil size={actionbtnSize} strokeWidth={actionbtnStroke} />
        </button>
        <button
          className={`${styles.actionBtn__list} ${styles.actionBtn__delete}`}
        >
          <Trash2 size={actionbtnSize} strokeWidth={actionbtnStroke} />
        </button>
      </div>
    </>
  );
};

const ListView = ({ data }) => {
  return (
    <div className={styles.listview__Container}>
      <div className={styles.listHeading__item}>Class Name</div>
      <div className={styles.listHeading__item}>Room </div>
      <div className={styles.listHeading__item}>Type</div>
      <div className={styles.listHeading__item}>Actions</div>
      {data.map((e, i) => (
        <Row data={e} key={i} />
      ))}
    </div>
  );
};

export default ListView;
