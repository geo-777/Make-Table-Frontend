import "../../../styles/appLayout.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { useState } from "react";
import { Plus } from "lucide-react";
import DetailsGrid from "../components/detailsGrid/DetailsGrid";
import styles from "../styles/Dashboard.module.css";
import TimeTableListings from "../components/timetableListingsGrid/TimeTableListings";
import TimeTablePopup from "../components/timetablePopups/TimeTablePopup";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
import { useTimetableData } from "../hooks/useTimetableData";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import DashboardSelected from "./DashboardSelected";

const DashboardOveriew = () => {
  const [isCreateTableOpen, setIsCreateTableOpen] = useState(false);

  const {
    timetableListings,
    draftTimeTables,
    publishedTimeTables,
    isFetchPending,
    isFetchError,
    isFetchSuccess,
    listingFetchError,
  } = useTimetableData();
  const { selectedTimetableData } = useTimeTableSelect();

  if (selectedTimetableData) return <DashboardSelected />;

  return (
    <div className="App">
      <TimeTablePopup
        mode="create"
        closePopup={() => setIsCreateTableOpen(false)}
        visible={isCreateTableOpen}
      />
      <div className="mainPlaceholder">
        <Topbar page={"Dashboard"} />

        <header className="header">
          <div className="headings">
            <h4>My Timetables</h4>
            <p>Manage your timetable workspaces</p>
          </div>
          <div className="right-panel">
            <button
              className="primary"
              onClick={() => setIsCreateTableOpen(true)}
            >
              <Plus strokeWidth={2} /> <p>New Timetable</p>{" "}
            </button>
          </div>
        </header>
        {isFetchError && (
          <StatusWrapper
            error={listingFetchError}
            isError={isFetchError}
          ></StatusWrapper>
        )}
        {isFetchPending && <StatusWrapper loader={true} />}
        {isFetchSuccess && (
          <div className={`main ${styles.mainPanel}`}>
            <DetailsGrid
              data={{
                total: timetableListings.data.length,
                published: publishedTimeTables.length,
                drafts: draftTimeTables.length,
              }}
            />
            {timetableListings.data.length === 0 && (
              <StatusWrapper isError={true}>
                <div className={styles.error404}>
                  <h4>No timetables created yet</h4>
                  <p>
                    Start by creating your first timetable to organize your
                    schedule.
                  </p>
                </div>
              </StatusWrapper>
            )}
            {publishedTimeTables.length != 0 && (
              <TimeTableListings
                type={"Published Timetables"}
                data={publishedTimeTables}
              />
            )}
            {draftTimeTables.length != 0 && (
              <TimeTableListings
                type={"Draft Timetables"}
                data={draftTimeTables}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOveriew;
