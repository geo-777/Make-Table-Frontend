import NavbarDesktop from "../../shared/components/desktopNavigation/NavbarDesktop";
import "../../styles/appLayout.css";
import Topbar from "../../shared/components/topbar/Topbar";

const HelpSupport = () => {
  return (
    <div className="App">
      <NavbarDesktop />
      <div className="mainPlaceholder">
        <Topbar page={"Help & Support"} />
      </div>
    </div>
  );
};

export default HelpSupport;
