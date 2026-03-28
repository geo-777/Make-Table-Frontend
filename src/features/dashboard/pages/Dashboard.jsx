import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import "../../../styles/appLayout.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { useState } from "react";
import { Plus } from "lucide-react";
import DetailsGrid from "../components/detailsGrid/DetailsGrid";
import styles from "../styles/Dashboard.module.css";
import TimeTableListings from "../components/timetableListingsGrid/TimeTableListings";
import TimeTableCreatePopup from "../components/timetableCreatePopup/TimeTableCreatePopup";

const Dashboard = () => {
  const [isCreateTableOpen, setIsCreateTableOpen] = useState(false);
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

        <div className={`main ${styles.mainPanel}`}>
          <DetailsGrid />
          <TimeTableListings type={"Published Timetables"} />
          {/* <TimeTableListings type={"Draft Timetables"} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
