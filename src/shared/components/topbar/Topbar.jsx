import styles from "./Topbar.module.css";
import { PanelLeft } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
import ProfileDropdown from "../profileDropDown/ProfileDropDown";
import { useState, useRef, useEffect } from "react";
import useNavStore from "../../zustand/navStore";
const Topbar = ({ page }) => {
  const { toggleNavbar } = useNavStore(); //handles navbar collapsing and opening

  const { user } = useAuth();
  // handles profile icon clicking popup menu
  const [isOpen, setIsOpen] = useState(false);
  let menuRef = useRef();

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

  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <span className={styles.navToggle} onClick={toggleNavbar}>
          <PanelLeft size={17} />
        </span>
        <p>{page}</p>
      </div>
      <div className={styles.right} onClick={() => setIsOpen((prev) => !prev)}>
        <div className={styles.profileIcon} ref={menuRef}>
          {user.slice(0, 2).toUpperCase()}
          <ProfileDropdown isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
