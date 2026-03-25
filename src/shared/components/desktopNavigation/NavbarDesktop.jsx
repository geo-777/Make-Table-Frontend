import styles from "./NavbarDesktop.module.css";
import { Calendar } from "lucide-react";
import {
  LayoutDashboard,
  GraduationCap,
  CircleQuestionMark,
  LibraryBig,
  Users,
  Settings,
  Table,
  ChevronDown,
} from "lucide-react";

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
  ];
  const extraLinks = [
    { text: "Settings", logo: <Settings size={iconSize} /> },
    {
      text: "Help & Support",
      logo: <CircleQuestionMark size={iconSize} />,
      alt: "helpsupport",
    },
  ];
  return (
    <div className={styles.navbar}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <span>
            <Calendar size={18} />
          </span>
          <p>MakeTable</p>
        </div>

        <div className={styles.selectedTimetable}>
          <div className={styles.selectedTimeTable__left}>
            <span>
              <Table size={18} />
            </span>
            <div className={styles.selectedTimeTable__Info}>
              <h4>Timetable 2025</h4>
              <p>Generated</p>
            </div>
          </div>

          <ChevronDown className={styles.chevron} size={16} />
        </div>
        <div className={styles.menu}>
          <h4>MENU</h4>
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
                  {elm.logo} <p>{elm.text}</p>
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
                    currentPath.trim() === ""
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => {
                    navigate(`/${elm?.alt || elm.text.toLowerCase()}`);
                  }}
                >
                  {elm.logo} <p>{elm.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <footer className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} MakeTable</p>
      </footer>
    </div>
  );
};

export default NavbarDesktop;
