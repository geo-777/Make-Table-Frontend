import styles from "./NavbarDesktop.module.css";
import { Calendar } from "lucide-react";
import {
  LayoutDashboard,
  GraduationCap,
  CircleQuestionMark,
  LibraryBig,
  Users,
  Settings,
  Link2,
} from "lucide-react";
import SelectedTimeTable from "../selectedTimeTable/SelectedTimeTable";
import useNavStore from "../../zustand/navStore";

import { useNavigate, useLocation } from "react-router-dom";

const NavbarDesktop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.replace("/", "");
  const iconSize = 18;
  const mainLinks = [
    { text: "Dashboard", logo: <LayoutDashboard size={iconSize} /> },
    { text: "Classes", logo: <GraduationCap size={iconSize} /> },
    { text: "Subjects", logo: <LibraryBig size={iconSize} /> },
    { text: "Teachers", logo: <Users size={iconSize} /> },
    { text: "Assignments", logo: <Link2 size={iconSize} /> },
  ];
  const extraLinks = [
    { text: "Settings", logo: <Settings size={iconSize} /> },
    {
      text: "Help & Support",
      logo: <CircleQuestionMark size={iconSize} />,
      alt: "helpsupport",
    },
  ];
  const { navbarCollapsed } = useNavStore();

  const ifCollapsedStyle = { display: navbarCollapsed ? "none" : "block" };
  return (
    <div
      className={styles.navbar}
      style={{ width: navbarCollapsed ? "60px" : "290px" }}
    >
      <div className={styles.top}>
        <div className={styles.logo}>
          <span>
            <Calendar size={18} />
          </span>
          <p style={ifCollapsedStyle}>MakeTable</p>
        </div>

        <SelectedTimeTable />

        <div className={styles.menu}>
          <h4 style={ifCollapsedStyle}>MENU</h4>
          <div className={styles.linkGroup}>
            {mainLinks.map((elm, i) => {
              return (
                <div
                  key={i}
                  className={`${styles.linkItem} ${
                    currentPath.startsWith(elm.text.toLowerCase()) ||
                    currentPath.trim() === ""
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => {
                    navigate(`/${elm?.alt || elm.text.toLowerCase()}`);
                  }}
                >
                  {elm.logo} <p style={ifCollapsedStyle}>{elm.text}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.seperator}></div>
          <div className={styles.linkGroup}>
            {extraLinks.map((elm, i) => {
              return (
                <div
                  key={i}
                  className={`${styles.linkItem} ${
                    currentPath.startsWith(elm.text.toLowerCase()) ||
                    currentPath.trim() === "" ||
                    currentPath.startsWith(elm?.alt)
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => {
                    navigate(`/${elm?.alt || elm.text.toLowerCase()}`);
                  }}
                >
                  {elm.logo} <p style={ifCollapsedStyle}>{elm.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <footer className={styles.bottom} style={ifCollapsedStyle}>
        <p>&copy; {new Date().getFullYear()} MakeTable</p>
      </footer>
    </div>
  );
};

export default NavbarDesktop;
