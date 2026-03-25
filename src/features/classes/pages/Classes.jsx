import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
const Classes = () => {
  return (
    <div className="App">
      <NavbarDesktop />
      <div className="mainPlaceholder">
        <Topbar page={"Classes"} />
      </div>
    </div>
  );
};

export default Classes;
