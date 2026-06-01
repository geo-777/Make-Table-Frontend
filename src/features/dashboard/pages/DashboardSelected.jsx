import "../../../styles/appLayout.css";
import styles from "../styles/DashboardSelected.module.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { 
  // Link2,
  // Share2, 
  Play, 
  Zap 
} from "lucide-react";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import useClasses from "../../../features/classes/hooks/useClasses";

const Header = ({
  name,
  days,
  slots,
  classes,
  viewStatus,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.meta}>
          <span className={`${styles.badge} ${styles.grey}`} >
            <span className={styles.dot} />
            {viewStatus}
          </span>
          <span className={styles.metaText}>
            {days} days · {slots} slots/day · {classes} classes
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        {/* <button className={styles.btnOutline}>
          <Link2 size={16} />
          Copy link
        </button>

        <button className={styles.btnOutline}>
          <Share2 size={16} />
          Share
        </button> */}

        <button className={styles.btnPrimary}>
          <Play size={16} />
          Generate
        </button>

        <button className={styles.btnOutline}>
          <Zap size={16} />
          Force
        </button>
      </div>
    </div>
  );
}

export default function DashboardSelected() {
  
  const { selectedTimetableData } = useTimeTableSelect();
  const { data:classes } = useClasses();

  console.log(selectedTimetableData);

  return (
    <div className="App">
      <Topbar page={"Dashboard"} />
      <div className="mainPlaceholder">
        <Header
          name={selectedTimetableData?.name || "Unknown"}
          days={selectedTimetableData?.days.length ?? 0}
          slots={selectedTimetableData?.slots ?? 0}
          classes={classes.data.length ?? 0}
          viewStatus={selectedTimetableData.view_status}
        />
      </div>
    </div>
  );
}