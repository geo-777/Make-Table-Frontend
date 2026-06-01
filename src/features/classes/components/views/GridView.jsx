import styles from "../../styles/Classes.module.css";
import { Pencil, Trash2 } from "lucide-react";
import useClasses from "../../hooks/useClasses";
import ClassPopup from "../popups/ClassPopup";
import { useState } from "react";
import StatusWrapper from "../../../../shared/components/statusWrapper/StatusWrapper";
// individual grid items.
const GridItem = ({ data, openEditPopup }) => {
  const actionbtnSize = 16;
  const actionbtnStroke = 1.75;
  const { deleteListing } = useClasses();

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
        <button
          className={styles.actionBtn}
          onClick={() => openEditPopup(data.id)}
        >
          <Pencil size={actionbtnSize} strokeWidth={actionbtnStroke} />
          <p>Edit</p>
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={async () => deleteListing.mutateAsync(data.id)}
        >
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
  const [existingData, setExistingData] = useState({});
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const openEditPopup = (id) => {
    const itemToEdit = data.find((e) => e.id === id);
    if (!itemToEdit) return;

    setExistingData(itemToEdit);
    setEditPopupOpen(true);
  };
  return (
    <>
      <ClassPopup
        visible={editPopupOpen}
        existingData={existingData}
        closePopup={() => {
          setEditPopupOpen(false);
          setExistingData({});
        }}
      />
      {data.length == 0 && (
        <StatusWrapper isError={true}>
          <div className={styles.error404}>
            <h4>No classes created yet</h4>
            <p>Start by creating your first class to organize your schedule.</p>
          </div>
        </StatusWrapper>
      )}
      <div
        className={`${styles.gridContainer} stagger-children fast grid-fast-stagger `}
      >
        {data.map((e, i) => (
          <GridItem openEditPopup={openEditPopup} data={e} key={i} />
        ))}
      </div>
    </>
  );
};

export default GridView;
