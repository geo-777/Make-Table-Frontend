import NavbarDesktop from "../../shared/components/desktopNavigation/NavbarDesktop";
import "../../styles/appLayout.css";
import Topbar from "../../shared/components/topbar/Topbar";
import { useState } from "react";
const Dashboard = () => {
  return (
    <div className="App">
      <NavbarDesktop />
      <div className="mainPlaceholder">
        <Topbar page={"Dashboard"} />
      </div>
    </div>
  );
};

export default Dashboard;
