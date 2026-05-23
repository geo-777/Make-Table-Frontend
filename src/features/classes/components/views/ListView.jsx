import { useMemo, useState } from "react";
import styles from "../../styles/Classes.module.css";
import { Pencil, Trash2, X, Check } from "lucide-react";
import CircularCheckBox from "../../../../shared/components/specialButtons/CircularCheckBox";
import useClasses from "../../hooks/useClasses";

const Row = ({ data, editClass }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState(data);
  const actionbtnSize = 16;
  const actionbtnStroke = 2;

  const closeEditMode = () => {
    setEditForm(data);
    setIsEditMode(false);
  };

  // this controls the enabling and disabling of the check button
  const submitEnabled = useMemo(() => {
    return (
      (editForm?.class_name.trim() != data?.class_name.trim() ||
        editForm?.room_name.trim() != data?.room_name.trim() ||
        editForm?.isLab != data?.isLab) &&
      editForm?.class_name.trim() &&
      editForm?.room_name.trim()
    );
  }, [editForm]);

  const editClassHandler = async () => {
    await editClass(data?.id, editForm);
    closeEditMode();
  };

  //edit mode design
  if (isEditMode) {
    return (
      <>
        <div className={styles.listItem}>
          <input
            className="input-text-style-1"
            type="text"
            placeholder="Enter class name"
            value={editForm.class_name}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, class_name: e.target.value }))
            }
          />
        </div>
        <div className={styles.listItem}>
          <input
            className="input-text-style-1"
            type="text"
            placeholder="Enter room name"
            value={editForm.room_name}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, room_name: e.target.value }))
            }
          />
        </div>
        <div
          className={`${styles.listItem} ${styles.isLabChecker} unselectable  `}
          onClick={() =>
            setEditForm((prev) => ({ ...prev, isLab: !prev.isLab }))
          }
        >
          <CircularCheckBox checked={editForm.isLab} />
          <p>Is lab ?</p>
        </div>
        <div className={`${styles.listItem} ${styles.listItem__actionBtns}`}>
          <button
            className={`${styles.actionBtn__list} ${styles.actionBtn__delete}`}
            onClick={closeEditMode}
          >
            <X size={actionbtnSize} strokeWidth={actionbtnStroke} />
          </button>
          <button
            disabled={!submitEnabled}
            onClick={editClassHandler}
            className={`${styles.actionBtn__list} ${styles.actionBtn__tick}`}
          >
            <Check size={actionbtnSize} strokeWidth={actionbtnStroke} />
          </button>
        </div>
      </>
    );
  }

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
        <button
          className={styles.actionBtn__list}
          onClick={() => setIsEditMode(true)}
        >
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
  const { patchListing } = useClasses();

  const editClass = async (id, data) => {
    await patchListing.mutateAsync({
      classId: id,
      data: data,
    });
  };
  return (
    <div className={styles.listview__Container}>
      <div className={styles.listHeading__item}>Class Name</div>
      <div className={styles.listHeading__item}>Room </div>
      <div className={styles.listHeading__item}>Type</div>
      <div className={styles.listHeading__item}>Actions</div>
      {data.map((e, i) => (
        <Row data={e} key={i} editClass={editClass} />
      ))}
    </div>
  );
};

export default ListView;
