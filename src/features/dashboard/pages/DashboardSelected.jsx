import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import "../../../styles/appLayout.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { useEffect, useState } from "react";
import { Play, Zap, Dot, CircleCheck } from "lucide-react";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import styles from "../styles/Dashboard.module.css";
const VIEW_STATUS = {
  Public: "Published",
  Private: "Private",
};
const DashboardSelected = () => {
  const { selectedTimetableData } = useTimeTableSelect();

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
      </div>
    </div>
  );
};

export default DashboardSelected;
