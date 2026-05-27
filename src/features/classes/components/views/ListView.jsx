import { useMemo, useState } from "react";
import styles from "../../styles/Classes.module.css";
import { Pencil, Trash2, X, Check } from "lucide-react";
import CircularCheckBox from "../../../../shared/components/specialButtons/CircularCheckBox";
import useClasses from "../../hooks/useClasses";
import StatusWrapper from "../../../../shared/components/statusWrapper/StatusWrapper";

const Row = ({ data, editClass, deleteClass }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState(data);
  const actionbtnSize = 16;
  const actionbtnStroke = 1.75;

  const closeEditMode = () => {
    setEditForm(data);
    setIsEditMode(false);
  };

  // this controls the enabling and disabling of the check button
  const payload = useMemo(() => {
    // Build object with only changed fields
    const changedFields = {};

    if (editForm.class_name.trim() !== data?.class_name?.trim()) {
      changedFields.class_name = editForm.class_name;
    }

    if (editForm.room_name.trim() !== data?.room_name?.trim()) {
      changedFields.room_name = editForm.room_name;
    }

    if (editForm.isLab !== data?.isLab) {
      changedFields.isLab = editForm.isLab;
    }

    return changedFields;
  }, [editForm]);

  const editClassHandler = async () => {
    console.log(data?.id, payload);
    await editClass(data?.id, payload);
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
            disabled={Object.keys(payload).length === 0}
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
          onClick={async () => await deleteClass(data?.id)}
        >
          <Trash2 size={actionbtnSize} strokeWidth={actionbtnStroke} />
        </button>
      </div>
    </>
  );
};

const ListView = ({ data }) => {
  const { patchListing, deleteListing } = useClasses();

  const editClass = async (id, data) => {
    await patchListing.mutateAsync({
      classId: id,
      data: data,
    });
  };
  const deleteClass = async (id) => {
    deleteListing.mutateAsync(id);
  };
  return (
    <div className={styles.listview__Container}>
      <div className={styles.listHeading__item}>Class Name</div>
      <div className={styles.listHeading__item}>Room </div>
      <div className={styles.listHeading__item}>Type</div>
      <div className={styles.listHeading__item}>Actions</div>
      {data.map((e, i) => (
        <Row
          data={e}
          key={e?.id ?? i}
          editClass={editClass}
          deleteClass={deleteClass}
        />
      ))}
      {data.length === 0 && (
        <div className={styles.emptyListings}>
          <h6>No classes defined</h6>
          <p>
            Add your first class to start defining constraints for this
            timetable.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListView;
