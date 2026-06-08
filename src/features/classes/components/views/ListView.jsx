import { useMemo, useState } from "react";
import styles from "../../styles/Classes.module.css";
import { Pencil, Trash2, X, Check } from "lucide-react";
import useClasses from "../../hooks/useClasses";
import ListSkeleton from "../../../../shared/components/skeltonLoading/ListSkeleton";

const IsLabLabel = ({ data }) => (
  <div className={`${styles.listItem} `}>
    <span className={`${styles.typeLabel} ${data.isLab ? styles.typeLab : ""}`}>
      {data.isLab ? "Lab" : "Regular"}
    </span>
  </div>
);

const Row = ({ data, editClass, deleteClass }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState(data);
  const actionbtnSize = 16;
  const actionbtnStroke = 1.75;

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
    return changedFields;
  }, [editForm, data?.class_name, data?.room_name]);

  const closeEditMode = () => {
    setEditForm(data);
    setIsEditMode(false);
  };

  const editClassHandler = async () => {
    if (Object.keys(payload).length > 0) await editClass(data?.id, payload);
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
        <IsLabLabel data={data} />
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
      <IsLabLabel data={data} />

      <div className={`${styles.listItem} ${styles.listItem__actionBtns}`}>
        <button
          className={styles.actionBtn__list}
          onClick={() => setIsEditMode(true)}
        >
          <Pencil size={actionbtnSize} strokeWidth={actionbtnStroke} />
        </button>
        <button
          className={`${styles.actionBtn__list} ${styles.actionBtn__delete}`}
          onClick={() => deleteClass(data?.id)}
        >
          <Trash2 size={actionbtnSize} strokeWidth={actionbtnStroke} />
        </button>
      </div>
    </>
  );
};

const ListView = ({ data, isLoading = false }) => {
  const { patchListing, deleteListing } = useClasses();

  if (isLoading) return <ListSkeleton />;

  const editClass = async (id, data) => {
    await patchListing.mutateAsync({
      classId: id,
      data: data,
    });
  };
  const deleteClass = async (id) => {
    await deleteListing.mutateAsync(id);
  };
  return (
    <div className={`${styles.listview__Container} fadeInUp fast`}>
      {["Class Name", "Room", "Type", "Actions"].map((e, i) => (
        <div className={styles.listHeading__item} key={i}>
          {e}
        </div>
      ))}

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
