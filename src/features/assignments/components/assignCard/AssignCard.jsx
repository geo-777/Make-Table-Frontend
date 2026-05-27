import styles from "./AssignCard.module.css";
import ItemCard from "../../../../shared/components/itemView/itemCard/ItemCard";
import { TeacherRoles, CLASS_TEACHER } from "../../utils/assignEnums";
/*
role possible values : Subject_Teacher and Class_Teacher
*/
const AssignCard = ({ data }) => {
  return (
    <ItemCard>
      <div className={styles.gridItem__header}>
        <div className={styles.gridItem__info}>
          <h6>{data?.teacher_name ?? ""}</h6>
          <p>
            {data?.class_name ?? ""} · {data?.subject_name ?? ""}
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
