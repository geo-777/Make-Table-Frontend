import styles from "./TimeTableListings.module.css";
import { Pencil, CircleCheck } from "lucide-react";
import TimeTablePopup from "../timetablePopups/TimeTablePopup";
import TimeTableListingItem from "../timetableListingItem/TimeTableListingItem";
import { useMemo, useState } from "react";
const TimeTableListings = ({ type, data }) => {
  const [isEditTableOpen, setIsEditTableOpen] = useState(false);
  const [existingData, setExistingData] = useState({});

  //helper function that sets data up for popup and opens it
  const openEditPopup = (id) => {
    const itemToEdit = data.find((e) => e.id === id);
    if (!itemToEdit) return;

    setExistingData(itemToEdit);
    setIsEditTableOpen(true);
  };
  // sorting based on id.. decreasing order
  const sortedData = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => b.id - a.id);
  }, [data]);
  return (
    <div className={`${styles.timetableListings} stagger-children `}>
      <TimeTablePopup
        mode="edit"
        closePopup={() => {
          setIsEditTableOpen(false);
          setExistingData({});
        }}
        visible={isEditTableOpen}
        existingData={existingData}
      />
      <div className={styles.timetableListings__header}>
        <span className={styles.icon}>
          {type.startsWith("Draft") && (
            <Pencil size={18} className={styles.draft} strokeWidth={1.5} />
          )}
          {type.startsWith("Published") && (
            <CircleCheck
              className={styles.published}
              size={18}
              strokeWidth={2}
            />
          )}
        </span>

        <p>{type}</p>
        <span
          className={`${type.startsWith("Published") ? styles.publishedCount : styles.draftCount}`}
        >
          <p>{data.length || 0}</p>
        </span>
      </div>

      <div className={styles.listingsGrid}>
        {sortedData.map((e, i) => (
          <TimeTableListingItem
            key={`${e.id}`}
            listingData={{
              id: e.id,
              name: e.name,
              slots: e.slots,
              days: e.days.length,
              type: e.view_status == "Private" ? "Draft" : "Published",
            }}
            fullData={e}
            editFunction={openEditPopup}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeTableListings;
