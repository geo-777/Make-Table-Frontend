import styles from "./Topbar.module.css";
import { PanelLeft } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
import ProfileDropdown from "../profileDropDown/ProfileDropDown";
import { useState, useRef, useEffect } from "react";
import useNavStore from "../../zustand/navStore";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import BreadCrumb from "../breadcrumb/BreadCrumb";
import { createPortal } from "react-dom";
const Topbar = ({ page }) => {
  const { toggleNavbar, toggleMobileNav, mobileNavOpen, setMobNav } =
    useNavStore(); //handles navbar collapsing and opening

  const { user } = useAuth();
  // handles profile icon clicking popup menu
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  //done to close menu if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const { width: pageWidth } = useWindowDimensions();
  const toggleNavHandler = () => {
    if (pageWidth > 615) toggleNavbar();
    else toggleMobileNav();
  };
  return (
    <div className={styles.topbar} id="topbar">
      <div
        style={{
          pointerEvents: mobileNavOpen & (pageWidth < 615) ? "auto" : "none",
          opacity: mobileNavOpen & (pageWidth < 615) ? 0.7 : 0,
        }}
        className="popup_overlay"
        onClick={() => setMobNav(false)}
      ></div>
      <div className={styles.left}>
        <span className={styles.navToggle} onClick={toggleNavHandler}>
          <PanelLeft size={17} />
        </span>
        {pageWidth > 830 ? <BreadCrumb /> : <p>{page}</p>}
      </div>
      <div className={styles.right} onClick={() => setIsOpen((prev) => !prev)}>
        <div className={styles.profileIcon} ref={menuRef}>
          {user.slice(0, 2).toUpperCase()}
          {createPortal(
            <ProfileDropdown
              isOpen={isOpen}
              style={{
                top: `${(document?.getElementById("topbar")?.getBoundingClientRect()?.height ?? 62) - 6}px`,
              }}
            />,
            document.body,
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
