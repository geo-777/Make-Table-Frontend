import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import "../../../styles/appLayout.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import DetailsGrid from "../components/detailsGrid/DetailsGrid";
import styles from "../styles/Dashboard.module.css";
import TimeTableListings from "../components/timetableListingsGrid/TimeTableListings";
import TimeTableCreatePopup from "../components/timetablePopups/TimeTableCreatePopup";
import useTimetableListing from "../hooks/useTimetableListing";
import StatusWrapper from "../../../shared/components/statusWrapper/StatusWrapper";
const Dashboard = () => {
  const [isCreateTableOpen, setIsCreateTableOpen] = useState(false);

  const { readListings } = useTimetableListing();

  const {
    data: timetableListings,
    isPending: isFetchPending,
    error: listingFetchError,
    isError: isFetchError,
    isSuccess: isFetchSuccess,
  } = readListings();

  const draftTimeTables = useMemo(() => {
    return timetableListings?.data?.filter((e) => e.view_status == "Private");
  }, [timetableListings]);
  const publisedTimeTables = useMemo(() => {
    return timetableListings?.data?.filter((e) => e.view_status == "Public");
  }, [timetableListings]);

  return (
    <div className="App">
      <NavbarDesktop />

      <TimeTableCreatePopup
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
                published: publisedTimeTables.length,
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
            {publisedTimeTables.length != 0 && (
              <TimeTableListings
                type={"Published Timetables"}
                data={publisedTimeTables}
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

export default Dashboard;
