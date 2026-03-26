import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import "../../../styles/appLayout.css";
import Topbar from "../../../shared/components/topbar/Topbar";
import { useState } from "react";
import { Plus, Pencil, CircleCheck } from "lucide-react";
import DetailsGrid from "../components/detailsGrid/DetailsGrid";
import styles from "../styles/Dashboard.module.css";
const Dashboard = () => {
  return (
    <div className="App">
      <NavbarDesktop />
      <div className="mainPlaceholder">
        <Topbar page={"Dashboard"} />

        <header className="header">
          <div className="headings">
            <h4>My Timetables</h4>
            <p>Manage your timetable workspaces</p>
          </div>
          <div className="right-panel">
            <button className="primary">
              <Plus strokeWidth={2} /> <p>New Timetable</p>{" "}
            </button>
          </div>
        </header>

        <div className="main">
          <DetailsGrid />
          <div className={styles.section}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
