import styles from "./AssignCard.module.css";
import ItemCard from "../../../../shared/components/itemView/itemCard/ItemCard";
import { TeacherRoles, CLASS_TEACHER } from "../../utils/assignEnums";
/*
role possible values : Subject_Teacher and Class_Teacher
*/
const AssignCard = ({ data, deleteFn, editFn }) => {
  const onDelete = async () => {
    await deleteFn(data?.id);
  };

  return (
    <ItemCard onDelete={onDelete} onEdit={() => editFn(data)}>
      <div className={styles.gridItem__header}>
        <div className={styles.gridItem__info}>
          <h6>{data?.teacher?.name ?? ""}</h6>
          <p>
            {data?.class_?.class_name ?? ""} · {data?.subject?.name ?? ""}
          </p>
        </div>
        <span
          className={`${styles.typeLabel} ${data?.role === CLASS_TEACHER ? styles.classTeacher : ""}`}
        >
          {TeacherRoles[data?.role] || ""}
        </span>
      </div>
      <div className={styles.daysContainer}>
        {(data?.morning_class_days ?? []).map((e) => (
          <p className={styles.dayItem} key={e}>
            {e}
          </p>
        ))}
      </div>
    </ItemCard>
  );
};

export default AssignCard;
