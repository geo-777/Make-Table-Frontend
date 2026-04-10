import NavbarDesktop from "../../../shared/components/desktopNavigation/NavbarDesktop";
import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import { Plus, Download, List, Grid2x2 } from "lucide-react";
import styles from "../styles/Classes.module.css";
import { useClassesView } from "../../../shared/zustand/listingsViewStore";
import GridView from "../components/GridView";
import ListView from "../components/ListView";

const Classes = () => {
  let mockData = [
    {
      id: 0,
      class_name: "S1 CSE",
      room_name: "string",
      isLab: false,
      created_at: "2026-04-10T10:44:53.876Z",
    },
    {
      id: 0,
      class_name: "S3 CSE",
      room_name: "string",
      isLab: true,
      created_at: "2026-04-10T10:44:53.876Z",
    },
  ];
  const { activeView, setActiveView } = useClassesView();
  return (
    <div className="App">
      <NavbarDesktop />
      {/* <TimeTableCreatePopup
        closePopup={() => setIsCreateTableOpen(false)}
        visible={isCreateTableOpen}
      /> */}
      <div className="mainPlaceholder">
        <Topbar page={"Classes"} />

        <header className="header">
          <div className="headings">
            <h4>Classes</h4>
            <p>Define class entities for S1 CSE 2025</p>
          </div>
          <div className="right-panel">
            <div className="secondary-btns-container">
              <div className="view-changer-container">
                <span
                  onClick={() => setActiveView("list")}
                  className={`view-change-btn ${activeView === "list" ? "view-active" : ""} `}
                >
                  <List size={18} strokeWidth={2} />
                </span>
                <span
                  onClick={() => setActiveView("grid")}
                  className={`view-change-btn ${activeView === "grid" ? "view-active" : ""} `}
                >
                  <Grid2x2 size={18} strokeWidth={2} />
                </span>
              </div>
              <button className="secondary-btn">
                {" "}
                <Download strokeWidth={1.7} size={18} /> <p>Bulk Import</p>{" "}
              </button>
            </div>

            <button
              className="primary add-btn"
              // onClick={() => setIsCreateTableOpen(true)}
            >
              <Plus strokeWidth={2} /> <p>Add Class</p>{" "}
            </button>
          </div>
        </header>

        <div className={`main `}>
          {activeView === "list" && <ListView data={mockData} />}
          {activeView === "grid" && <GridView data={mockData} />}
        </div>
      </div>
    </div>
  );
};

export default Classes;
