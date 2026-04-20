import styles from "./TimeTableListingItem.module.css";
import {
  CircleCheck,
  ClockFading,
  EllipsisVertical,
  Check,
  RefreshCcw,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { useState } from "react";
import DropDownMenu from "../../../../shared/components/dropDownMenu/DropDownMenu";
import { useEffect, useRef } from "react";
import useTimetableListing from "../../hooks/useTimetableListing";
import { toast } from "react-toastify";
/*
listingData of the format {
    name : "Timetable name"
    slots : 6
    Days : whatever days
    Type : published or draft
}
*/
const TimeTableListingItem = ({ listingData }) => {
  const { deleteListing } = useTimetableListing();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuIconSize = 14.5;
  const menuIconStrokeWidth = 2;

  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  const handleDeletion = (id) => {
    handleDeletion = deleteListing.mutate(id);
    if (deleteListing.isError) {
      toast.error(deleteListing.error);
    }
  };
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
        <div className={styles.extraMenu} ref={menuRef}>
          <button
            className={styles.threeDots}
            onClick={() => setMenuVisible((prev) => !prev)}
          >
            <EllipsisVertical size={18} />
          </button>
          <DropDownMenu
            key={`${listingData.id}-dropdown`}
            visible={menuVisible}
            top={"2.6rem"}
            right={"1rem"}
          >
            <div className={styles.dropDownItem}>
              <Eye size={menuIconSize} strokeWidth={menuIconStrokeWidth} />
              <p>Open</p>
            </div>
            <div className={styles.dropDownItem}>
              <Pencil size={menuIconSize} strokeWidth={menuIconStrokeWidth} />
              <p>Edit</p>
            </div>
            <div className={styles.seperator}></div>
            <div
              className={`${styles.dropDownItem} ${styles.deleteBtn}`}
              onClick={() => handleDeletion(listingData.id)}
            >
              <Trash2 size={menuIconSize} strokeWidth={menuIconStrokeWidth} />
              <p>Delete</p>
            </div>
          </DropDownMenu>
        </div>
      </div>
    </div>
  );
};

export default TimeTableListingItem;
