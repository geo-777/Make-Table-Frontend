import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
const Subjects = () => {
  return (
    <div className="App">
      <NavbarDesktop />
      <div className="mainPlaceholder">
        <Topbar page={"Subjects"} />
      </div>
    </div>
  );
};

export default Subjects;
