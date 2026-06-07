import styles from "./SelectedTimeTable.module.css";
import { Table2, ChevronDown, Check, Table } from "lucide-react";
import useNavStore from "../../zustand/navStore";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useTimetableData } from "../../../features/dashboard/hooks/useTimetableData";
import { useRef, useState, useEffect } from "react";
import DropDownMenu from "../dropDownMenu/DropDownMenu";
import useTimeTableSelect from "../../zustand/timetableSelectStore";

const UI_RESET = {
  header: "No timetable",
  tagline: "Click to select",
};

const SelectedTimeTable = () => {
  const { navbarCollapsed } = useNavStore();
  const { width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const [uiData, setUiData] = useState(UI_RESET);
  const { selectedTimetableData, selectTimeTableData } = useTimeTableSelect();
  const { timetables, isFetchPending, isFetchError, isFetchSuccess } = useTimetableData();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (!selectedTimetableData) return;
    selectTimeTableData(
      timetables.find((e) => e?.id === selectedTimetableData?.id) ?? null
    );
  }, [timetables, selectTimeTableData, selectedTimetableData]);

  useEffect(() => {
    if (!selectedTimetableData) {
      setUiData(
        isFetchSuccess && timetables?.length === 0
          ? { header: "No timetable", tagline: "Create now" }
          : UI_RESET
      );
    } else {
      setUiData({
        header: selectedTimetableData.name,
        tagline: selectedTimetableData.view_status,
      });
    }
  }, [selectedTimetableData, isFetchSuccess, timetables]);

  const handleMenuToggle = () => {
    if (isFetchPending || isFetchError) return;
    if (isFetchSuccess && timetables?.length === 0) return;
    setMenuVisible((prev) => !prev);
  };

  const handleSelect = (target) => {
    selectTimeTableData(target);
    setMenuVisible(false);
  };

  const menuContent = (() => {
    if (!menuVisible) return null;

    return (
      <DropDownMenu
        visible={menuVisible}
        style={{
          right: width < 615 ? "0rem" : "-10.5rem",
          top: width > 615 ? "0rem" : "3.5rem",
        }}
      >
        {isFetchSuccess &&
          timetables.map((e) => (
            <div
              key={e?.id}
              className={styles.dropDownItem}
              onClick={() => handleSelect(e)}
            >
              <div className={styles.dropItem__left}>
                <Table size={14} />
                <p>{e.name}</p>
              </div>
              {selectedTimetableData?.id === e?.id && <Check size={14} />}
            </div>
          ))}
        {isFetchSuccess && timetables?.length > 0 && (
          <div className={styles.seperator} />
        )}
        <div className={styles.dropDownItem} onClick={() => handleSelect(null)}>
          <p>View all timetables</p>
        </div>
      </DropDownMenu>
    );
  })();

  if (navbarCollapsed && width > 615) {
    return (
      <div
        className={styles.selectedTimetable}
        onClick={handleMenuToggle}
        ref={menuRef}
      >
        {menuContent}
        <div className={styles.collapsedIcon}>
          <Table2 size={18} />
        </div>
      </div>
    );
  };

  if (isFetchSuccess && timetables?.length === 0) return null;

  return (
    <div
      className={styles.selectedTimetable}
      onClick={handleMenuToggle}
      ref={menuRef}
    >
      {menuContent}
      <div className={styles.selectedTimeTable__left}>
        <span className={styles.iconWrapper}>
          <Table2 size={18} />
        </span>
        <div className={styles.selectedTimeTable__Info}>
          <h4>{uiData.header}</h4>
          <p>{uiData.tagline}</p>
        </div>
      </div>
      <ChevronDown className={styles.chevron} size={16} />
    </div>
  );
};

export default SelectedTimeTable;