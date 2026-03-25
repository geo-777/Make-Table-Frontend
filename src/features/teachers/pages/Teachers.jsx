import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
const Teachers = () => {
  return (
    <div className="App">
      <NavbarDesktop />
      <div className="mainPlaceholder">
        <Topbar page={"Teachers"} />
      </div>
    </div>
  );
};

export default Teachers;
