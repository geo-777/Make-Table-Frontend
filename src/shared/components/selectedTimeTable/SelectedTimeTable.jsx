import styles from "./SelectedTimeTable.module.css";
import { Table, ChevronDown, Check } from "lucide-react";
import useNavStore from "../../zustand/navStore";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useTimetableData } from "../../../features/dashboard/hooks/useTimetableData";
import { useRef, useState, useEffect } from "react";
import DropDownMenu from "../dropDownMenu/DropDownMenu";
import useTimeTableSelect from "../../zustand/timetableSelectStore";
const SelectedTimeTable = () => {
  const UI_RESET = {
    header: "No timetable ",
    tagline: "Click to select",
  };
  const { navbarCollapsed } = useNavStore();
  const { width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const [uiData, setUiData] = useState(UI_RESET);

  const { selectedTimetableData, selectTimeTableData } = useTimeTableSelect();

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

  const { timetables, isFetchPending, isFetchError, isFetchSuccess } =
    useTimetableData();

  const handleMenuToggle = () => {
    if (isFetchPending || isFetchError) return;

    setMenuVisible((prev) => !prev);
  };
  // for updating ui state according to selected timetable
  useEffect(() => {
    if (!selectedTimetableData) {
      setUiData(UI_RESET);
    } else {
      setUiData({
        header: selectedTimetableData.name,
        tagline: selectedTimetableData.view_status,
      });
    }
  }, [selectedTimetableData]);

  const handleSelect = (target) => {
    // i.e null
    selectTimeTableData(target);
    setMenuVisible(false);
  };
  const Menu = () => {
    return (
      <DropDownMenu
        visible={menuVisible}
        right={width < 615 ? "0rem" : "-10.5rem"}
        top={width > 615 ? "0rem" : "3.5rem"}
      >
        {isFetchSuccess &&
          timetables.map((e, i) => {
            const selected = selectedTimetableData?.id === e?.id;
            return (
              <div
                key={i}
                className={styles.dropDownItem}
                onClick={() => handleSelect(e)}
              >
                <div className={styles.dropItem__left}>
                  <Table size={14} />

                  <p>{e.name}</p>
                </div>
                {selected && <Check size={14} />}
              </div>
            );
          })}
        {isFetchSuccess && <div className={styles.seperator}></div>}
        <div
          className={`${styles.dropDownItem}`}
          onClick={() => handleSelect(null)}
        >
          <p>View all timetables</p>
        </div>
      </DropDownMenu>
    );
  };

  // only need to hide info div in desktop.. mobile has it
  if (navbarCollapsed && width > 615)
    return (
      <div
        className={styles.selectedTimetable}
        onClick={handleMenuToggle}
        ref={menuRef}
      >
        {" "}
        <Menu />
        <div className={styles.collapsedIcon}>
          <Table size={18} />
        </div>
      </div>
    );
  return (
    <div
      className={styles.selectedTimetable}
      onClick={handleMenuToggle}
      ref={menuRef}
    >
      <Menu />

      <div className={styles.selectedTimeTable__left}>
        <span>
          <Table size={18} />
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
