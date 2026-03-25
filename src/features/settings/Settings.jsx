import NavbarDesktop from "../../shared/components/desktopNavigation/NavbarDesktop";
import "../../styles/appLayout.css";
import Topbar from "../../shared/components/topbar/Topbar";

const Settings = () => {
  return (
    <div className="App">
      <NavbarDesktop />
      <div className="mainPlaceholder">
        <Topbar page={"Settings"} />
      </div>
    </div>
  );
};

export default Settings;
