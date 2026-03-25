import styles from "./SelectedTimeTable.module.css";
import { Table, ChevronDown } from "lucide-react";
import useNavStore from "../../zustand/navStore";
import useWindowDimensions from "../../hooks/useWindowDimensions";
const SelectedTimeTable = () => {
  const { navbarCollapsed } = useNavStore();
  const { width } = useWindowDimensions();
  // only need to hide info div in desktop.. mobile has it
  if (navbarCollapsed && width > 615)
    return (
      <div className={styles.selectedTimetable}>
        {" "}
        <div className={styles.collapsedIcon}>
          <Table size={18} />
        </div>
      </div>
    );
  return (
    <div className={styles.selectedTimetable}>
      <div className={styles.selectedTimeTable__left}>
        <span>
          <Table size={18} />
        </span>
        <div className={styles.selectedTimeTable__Info}>
          <h4>Timetable 2025</h4>
          <p>Generated</p>
        </div>
      </div>

      <ChevronDown className={styles.chevron} size={16} />
    </div>
  );
};

export default SelectedTimeTable;
