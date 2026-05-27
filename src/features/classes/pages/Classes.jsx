import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import { Plus, Download, List, Grid2x2 } from "lucide-react";
import styles from "../styles/Classes.module.css";
import { useClassesView } from "../../../shared/zustand/listingsViewStore";
import GridView from "../components/views/GridView";
import ListView from "../components/views/ListView";
import { useState } from "react";
import ClassPopup from "../components/popups/ClassPopup";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import useClasses from "../hooks/useClasses";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
const Classes = () => {
  const [isCreateClassOpen, setCreateClassOpen] = useState(false);

  const { activeView, setActiveView } = useClassesView();

  const { selectedTimetableData } = useTimeTableSelect();

  const { data: listings, isPending, isError, isSuccess, error } = useClasses();

  if (!selectedTimetableData) {
    return (
      <div className={styles.inactiveState}>
        <h4>No timetable selected yet</h4>
        <p>Select a timetable from the workspace selector above.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <ClassPopup
        closePopup={() => setCreateClassOpen(false)}
        visible={isCreateClassOpen}
      />
      <div className="mainPlaceholder">
        <Topbar page={"Classes"} />

        <header className="header">
          <div className="headings">
            <h4>Classes</h4>
            <p>
              Define class entities for{" "}
              {selectedTimetableData?.name || "unknown"}
            </p>
          </div>
          <div className="right-panel">
            <div className="secondary-btns-container">
              <div className="view-changer-container">
                <span
                  onClick={() => setActiveView("list")}
                  className={`view-change-btn ${activeView === "list" ? "view-active" : ""} `}
                >
                  <List size={18} strokeWidth={2} />
                </span>
                <span
                  onClick={() => setActiveView("grid")}
                  className={`view-change-btn ${activeView === "grid" ? "view-active" : ""} `}
                >
                  <Grid2x2 size={18} strokeWidth={2} />
                </span>
              </div>
              <button className="secondary-btn">
                {" "}
                <Download strokeWidth={1.7} size={18} /> <p>Bulk Import</p>{" "}
              </button>
            </div>

            <button
              className="primary add-btn"
              onClick={() => setCreateClassOpen(true)}
            >
              <Plus strokeWidth={2} /> <p>Add Class</p>{" "}
            </button>
          </div>
        </header>

        <div className={`main `}>
          {isPending && <StatusWrapper loader={true} />}
          {activeView === "list" && isSuccess && (
            <ListView data={listings?.data || []} />
          )}
          {activeView === "grid" && isSuccess && (
            <GridView data={listings?.data || []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;
