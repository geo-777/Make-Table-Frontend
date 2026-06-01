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
import { useState, useRef, useEffect } from "react";
import DropDownMenu from "../../../../shared/components/dropDownMenu/DropDownMenu";
import useTimetableListing from "../../hooks/useTimetableListing";
import useTimeTableSelect from "../../../../shared/zustand/timetableSelectStore.js";
import { motion } from "framer-motion";
/*
listingData of the format {
    name : "Timetable name"
    slots : 6
    Days : whatever days
    Type : published or draft
}
*/
const TimeTableListingItem = ({ listingData, editFunction, fullData }) => {
  const { selectTimeTableData } = useTimeTableSelect();

  const { deleteListing, setViewStatus } = useTimetableListing();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuIconSize = 14.5;
  const menuIconStrokeWidth = 2;

  const menuRef = useRef(null);

  //handling clicking out of menu to close menu
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

  const handleViewStatus = async (id, status) => {
    //guard that prevents duplicate requests
    if (setViewStatus.isPending) return;

    await setViewStatus.mutateAsync({
      id,
      data: status,
    });
  };

  const handleDeletion = async (id) => {
    if (deleteListing.isPending) return;

    await deleteListing.mutateAsync(id);
    setMenuVisible(false);
  };
  return (
    <>
      <motion.div
        className={styles.listing}
        onClick={() => selectTimeTableData(fullData)}
      >
        <div className={styles.mainLeft}>
          <div className={styles.icon}>
            {listingData.name?.[0]?.toUpperCase() ?? "?"}
          </div>
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
            onClick={async (e) => {
              e.stopPropagation();
              await handleViewStatus(
                listingData.id,
                listingData.type === "Draft" ? "Public" : "Private",
              );
            }}
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
              onClick={(e) => {
                e.stopPropagation();
                setMenuVisible((prev) => !prev);
              }}
            >
              <EllipsisVertical size={18} />
            </button>
            <DropDownMenu
              key={`${listingData.id}-dropdown`}
              visible={menuVisible}
              top={"2.6rem"}
              right={"1rem"}
            >
              <div
                className={styles.dropDownItem}
                onClick={(e) => {
                  e.stopPropagation();
                  selectTimeTableData(fullData);
                }}
              >
                <Eye size={menuIconSize} strokeWidth={menuIconStrokeWidth} />
                <p>Open</p>
              </div>
              <div
                className={styles.dropDownItem}
                onClick={(e) => {
                  e.stopPropagation();
                  editFunction(listingData.id);
                  setMenuVisible(false);
                }}
              >
                <Pencil size={menuIconSize} strokeWidth={menuIconStrokeWidth} />
                <p>Edit</p>
              </div>
              <div className={styles.seperator}></div>
              <div
                className={`${styles.dropDownItem} ${styles.deleteBtn}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletion(listingData.id);
                }}
              >
                <Trash2 size={menuIconSize} strokeWidth={menuIconStrokeWidth} />
                <p>Delete</p>
              </div>
            </DropDownMenu>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TimeTableListingItem;
