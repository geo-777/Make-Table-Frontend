import styles from "./NavbarMobile.module.css";
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

const NavbarMobile = () => {
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
  const { mobileNavOpen, setMobNav } = useNavStore();

  return (
    <div
      className={`${styles.navbar} ${mobileNavOpen ? styles.open : ""}`}
      onClick={() => setMobNav(false)}
    >
      <div className={styles.top}>
        <div className={styles.logo}>
          <span>
            <Calendar size={18} />
          </span>
          <p>MakeTable</p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <SelectedTimeTable />
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
                    setMobNav(false);
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
                    currentPath.trim() === "" ||
                    currentPath.startsWith(elm?.alt)
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => {
                    navigate(`/${elm?.alt || elm.text.toLowerCase()}`);
                    setMobNav(false);
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

export default NavbarMobile;
