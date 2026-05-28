import styles from "./Navbar.module.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  Calendar,
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
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const ICON_SIZE = 18;

const MAIN_LINKS = [
  { text: "Dashboard", logo: <LayoutDashboard size={ICON_SIZE} /> },
  { text: "Classes", logo: <GraduationCap size={ICON_SIZE} /> },
  { text: "Subjects", logo: <LibraryBig size={ICON_SIZE} /> },
  { text: "Teachers", logo: <Users size={ICON_SIZE} /> },
  { text: "Assignments", logo: <Link2 size={ICON_SIZE} /> },
];

const EXTRA_LINKS = [
  { text: "Settings", logo: <Settings size={ICON_SIZE} /> },
  {
    text: "Help & Support",
    logo: <CircleQuestionMark size={ICON_SIZE} />,
    alt: "helpsupport",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPath = pathname.replace("/", "");

  const { width } = useWindowDimensions();
  const isMobile = width <= 615;

  const { navbarCollapsed, mobileNavOpen, setMobNav } = useNavStore();

  const isCollapsed = !isMobile && navbarCollapsed;
  const hideText = isMobile ? false : isCollapsed;

  const handleNavClick = (link) => {
    navigate(`/${link.alt ?? link.text.toLowerCase()}`);
    if (isMobile) setMobNav(false);
  };

  const isActive = (link) =>
    currentPath.startsWith(link.alt ?? link.text.toLowerCase()) ||
    (!isMobile && currentPath.trim() === "");

  const renderLinks = (links) =>
    links.map((link, i) => (
      <div
        key={i}
        className={`${styles.linkItem} ${isActive(link) ? styles.selected : ""}`}
        onClick={() => handleNavClick(link)}
      >
        {link.logo}
        {!hideText && <p>{link.text}</p>}
      </div>
    ));

  const nav = (
    <>
      <div
        className={[styles.navbar, isMobile && mobileNavOpen ? styles.open : ""]
          .join(" ")
          .trim()}
        style={
          !isMobile ? { width: isCollapsed ? "60px" : "290px" } : undefined
        }
        onClick={isMobile ? () => setMobNav(false) : undefined}
      >
        <div className={styles.top}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>
              <Calendar size={ICON_SIZE} />
            </span>
            {!hideText && <p>MakeTable</p>}
          </div>

          <div onClick={isMobile ? (e) => e.stopPropagation() : undefined}>
            <SelectedTimeTable />
          </div>

          <div className={styles.menu}>
            {!hideText && <h4 className={styles.menuHeading}>MENU</h4>}
            <div className={styles.linkGroup}>{renderLinks(MAIN_LINKS)}</div>
            <div className={styles.separator} />
            <div className={styles.linkGroup}>{renderLinks(EXTRA_LINKS)}</div>
          </div>
        </div>

        {!hideText && (
          <footer className={styles.bottom}>
            <p>&copy; {new Date().getFullYear()} MakeTable</p>
          </footer>
        )}
      </div>

      {isMobile && <Outlet />}
    </>
  );

  if (isMobile) return nav;

  return (
    <div className={styles.layout}>
      {nav}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
