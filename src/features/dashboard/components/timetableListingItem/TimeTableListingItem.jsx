import styles from "./TimeTableListingItem.module.css";
import {
  CircleCheck,
  ClockFading,
  EllipsisVertical,
  Check,
  RefreshCcw,
} from "lucide-react";

/*
listingData of the format {
    name : "Timetable name"
    slots : 6
    Days : whatever days
    Type : published or draft
}
*/
const TimeTableListingItem = ({ listingData }) => {
  return (
    <div className={styles.listing}>
      <div className={styles.mainLeft}>
        <div className={styles.icon}>{listingData.name[0].toUpperCase()}</div>
        <div className={styles.listingInfo}>
          <h4>
            {listingData.name}
            <span
              className={`${styles.typeIcon} ${listingData.type === "Published" ? styles.publishedLabel : styles.draftLabel}`}
            >
              {listingData.type === "Published" && (
                <CircleCheck size={12} strokeWidth={2} />
              )}
              {listingData.type === "Draft" && (
                <ClockFading size={12} strokeWidth={1.75} />
              )}
              {listingData.type}
            </span>
          </h4>
          <p>
            {listingData.days} days · {listingData.slots} slots
          </p>
        </div>
      </div>
      <div className={styles.actionBtns}>
        <button
          className={`${styles.primaryBtn} ${listingData.type === "Published" ? styles.unpublishBtn : styles.publishedBtn}`}
        >
          {listingData.type === "Draft" ? (
            <>
              <Check size={16} /> <p>Publish </p>
            </>
          ) : (
            <>
              <RefreshCcw size={16} /> <p>Unpublish </p>
            </>
          )}
        </button>
        <button className={styles.threeDots}>
          <EllipsisVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default TimeTableListingItem;
