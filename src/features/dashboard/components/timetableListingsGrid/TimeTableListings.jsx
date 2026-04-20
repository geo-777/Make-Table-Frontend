import styles from "./TimeTableListings.module.css";
import { Pencil, CircleCheck } from "lucide-react";
import TimeTableListingItem from "../timetableListingItem/TimeTableListingItem";
const TimeTableListings = ({ type, data }) => {
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
        {data
          .sort((a, b) => b.id - a.id)
          .map((e, i) => (
            <TimeTableListingItem
              key={`${e.id}-listing-${i}`}
              listingData={{
                id: e.id,
                name: e.name,
                slots: e.slots,
                days: e.days.length,
                type: e.view_status == "Private" ? "Draft" : "Published",
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default TimeTableListings;
