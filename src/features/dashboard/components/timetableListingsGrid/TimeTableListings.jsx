import styles from "./TimeTableListings.module.css";
import { Pencil, CircleCheck } from "lucide-react";
import TimeTableListingItem from "../timetableListingItem/TimeTableListingItem";
const TimeTableListings = ({ type }) => {
  return (
    <div className={styles.timetableListings}>
      <div className={styles.timetableListings__header}>
        <span className={styles.icon}>
          {type.startsWith("Draft") && <Pencil size={18} strokeWidth={1.5} />}
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
          <p>1</p>
        </span>
      </div>

      <div className={styles.listingsGrid}>
        <TimeTableListingItem
          listingData={{
            name: "Timetable-205",
            slots: 6,
            days: 3,
            type: "Draft",
          }}
        />

        <TimeTableListingItem
          listingData={{
            name: "Academic-year-2026",
            slots: 6,
            days: 3,
            type: "Published",
          }}
        />
      </div>
    </div>
  );
};

export default TimeTableListings;
