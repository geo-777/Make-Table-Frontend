import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import "../../../styles/appLayout.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { Play, Zap, TriangleAlert } from "lucide-react";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import styles from "../styles/Dashboard.module.css";
import DetailsGridTimetable from "../components/detailsGrid/DetailsGridTimetable";
import ClassTimetable from "../components/timeTables/ClassTimetable";
import TeacherTimetable from "../components/timeTables/TeacherTimetable";
import { useState } from "react";
const VIEW_STATUS = {
  Public: "Published",
  Private: "Private",
};
const DashboardSelected = () => {
  const { selectedTimetableData } = useTimeTableSelect();

  const [timeTableMode, setTimeTableMode] = useState("classes");

  return (
    <div className="App">
      <NavbarDesktop />

      <div className="mainPlaceholder">
        <Topbar page={"Dashboard"} />

        <header className="header">
          <div className="headings">
            <h4>{selectedTimetableData?.name || "Unknown"}</h4>
            <div className={styles.header_extraInfo}>
              <span
                className={`${styles.typeIcon} ${selectedTimetableData.view_status === "Public" ? styles.publishedLabel : styles.draftLabel}`}
              >
                {" "}
                <span className={styles.statusDot}></span>
                {VIEW_STATUS[selectedTimetableData.view_status]}
              </span>
              <p>
                {selectedTimetableData?.days.length} days ·{" "}
                {selectedTimetableData?.slots} slots/day
              </p>
            </div>
          </div>
          <div className="right-panel">
            <button
              className="primary"
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <Play size={16} strokeWidth={2.5} /> <p>Generate</p>{" "}
            </button>
            <button className="secondary-btn">
              {" "}
              <Zap strokeWidth={1.7} size={18} /> <p>Force </p>{" "}
            </button>
          </div>
        </header>
        <div className={`main`}>
          <DetailsGridTimetable />
          <div className={styles.modeSelect}>
            <span
              onClick={() => setTimeTableMode("classes")}
              className={timeTableMode === "classes" ? styles.activeMode : ""}
            >
              Class Timetables
            </span>
            <span
              onClick={() => setTimeTableMode("teachers")}
              className={timeTableMode === "teachers" ? styles.activeMode : ""}
            >
              Teacher Timetables
            </span>
          </div>
          {timeTableMode === "classes" ? (
            <ClassTimetable />
          ) : (
            <TeacherTimetable />
          )}
          <div className={styles.violationsContainer}>
            <h4>Violations</h4>
            <div className={styles.violations}>
              <div className={styles.violationItem}>
                <TriangleAlert size={16} />
                <p>Dr. Smith: Dr. Smith has 3 consecutive classes on Monday</p>
              </div>
              <div className={styles.violationItem}>
                <TriangleAlert size={16} />
                <p>Physics: Physics exceeds max 2 classes/day on Thursday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelected;
