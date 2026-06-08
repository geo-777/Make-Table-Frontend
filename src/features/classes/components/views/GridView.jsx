import styles from "../../styles/Classes.module.css";
import { Pencil, Trash2, Badge } from "lucide-react";
import useClasses from "../../hooks/useClasses";
import ClassPopup from "../popups/ClassPopup";
import { useState, memo, useCallback } from "react";
import StatusWrapper from "../../../../shared/components/statusWrapper/StatusWrapper";
import GridSkelton from "../../../../shared/components/skeltonLoading/GridSkelton";
import createColor from "../../../../shared/utils/hashColor";
// individual grid items.
const GridItem = memo(({ data, openEditPopup, onDelete }) => {
  const actionbtnSize = 16;
  const actionbtnStroke = 1.75;

  const color = createColor(data.class_name);
  console.log("Rerendered,", data?.id);
  return (
    <div className={styles.gridItem}>
      <div className={styles.gridItem__header}>
        <div className={styles.gridItem__info}>
          <div style={{ display: "flex", gap: "6px" }}>
            <Badge size={24} style={{ fill: color, stroke: color }} />
            <h6>{data.class_name}</h6>
          </div>
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
          onClick={() => onDelete(data.id)}
        >
          <Trash2 size={actionbtnSize} strokeWidth={actionbtnStroke} />
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
});

/* 
data object structure :
      id: 0,
      class_name: "S1 CSE",
      room_name: "string",
      isLab: false,
      created_at: "2026-04-10T10:44:53.876Z",
*/
const GridView = ({ data, isLoading = false }) => {
  const [existingData, setExistingData] = useState(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const { deleteListing } = useClasses();
  const openEditPopup = useCallback(
    (id) => {
      const itemToEdit = data.find((e) => e.id === id);
      if (!itemToEdit) return;

      setExistingData(itemToEdit);
      setEditPopupOpen(true);
    },
    [data],
  );

  const onDelete = useCallback(
    (id) => deleteListing.mutate(id),
    [deleteListing],
  );
  return (
    <>
      <ClassPopup
        visible={editPopupOpen}
        existingData={existingData}
        closePopup={() => {
          setEditPopupOpen(false);
          setExistingData(null);
        }}
      />
      {data.length === 0 && !isLoading && (
        <StatusWrapper isError={true}>
          <div className={styles.error404}>
            <h4>No classes created yet</h4>
            <p>Start by creating your first class to organize your schedule.</p>
          </div>
        </StatusWrapper>
      )}

      {isLoading ? (
        <GridSkelton count={12} height={120} columns={5} gap={16} />
      ) : (
        <div
          className={`${styles.gridContainer} stagger-children fast grid-fast-stagger `}
        >
          {data.map((e) => (
            <GridItem
              onDelete={onDelete}
              openEditPopup={openEditPopup}
              data={e}
              key={e.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GridView;
