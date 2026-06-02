import styles from "./ListView.module.css";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { TeacherRoles, CLASS_TEACHER } from "../../utils/assignEnums";
import { useState } from "react";

const Row = ({ data, deleteFn, editFn }) => {
  const actionbtnSize = 16;
  const actionbtnStroke = 1.75;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState(data);

  return (
    <>
      <div className={styles.listItem}>{data?.teacher?.name ?? ""}</div>
      <div className={styles.listItem}>{data?.class_?.class_name ?? ""}</div>
      <div className={styles.listItem}>{data?.subject?.name ?? ""}</div>
      <div className={styles.listItem}>
        <span
          className={`${styles.typeLabel} ${data?.role === CLASS_TEACHER ? styles.classTeacher : ""}`}
        >
          {TeacherRoles[data?.role] || ""}
        </span>
      </div>
      <div className={`${styles.listItem} ${styles.daysContainer}`}>
        {(data?.morning_class_days ?? []).length > 0 ? (
          (data?.morning_class_days ?? []).map((e) => (
            <p className={styles.dayItem} key={e}>
              {e}
            </p>
          ))
        ) : (
          <span className={styles.emDash}>—</span>
        )}
      </div>

      <div className={`${styles.listItem} ${styles.listItem__actionBtns}`}>
        <button className={styles.actionBtn__list} onClick={() => editFn(data)}>
          <Pencil size={actionbtnSize} strokeWidth={actionbtnStroke} />
        </button>
        <button
          className={`${styles.actionBtn__list} ${styles.actionBtn__delete}`}
          onClick={async () => await deleteFn(data?.id)}
        >
          <Trash2 size={actionbtnSize} strokeWidth={actionbtnStroke} />
        </button>
      </div>
    </>
  );
};

const ListView = ({ data = [], deleteFn, editFn }) => {
  console.log(data);
  return (
    <div className={`fadeInUp fast ${styles.listview__Container}`}>
      <div className={styles.listHeading__item}>Teacher</div>
      <div className={styles.listHeading__item}>Class </div>
      <div className={styles.listHeading__item}>Subject</div>
      <div className={styles.listHeading__item}>Role</div>
      <div className={styles.listHeading__item}>Morning Days</div>
      <div className={styles.listHeading__item}>Actions</div>

      {data.map((e, i) => (
        <Row data={e} key={e?.id ?? i} deleteFn={deleteFn} editFn={editFn} />
      ))}
      {data?.length === 0 && (
        <div className={styles.emptyListings}>
          <h6>No assignments defined</h6>
          <p>
            Add your first assignment to start defining constraints for this
            timetable.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListView;
