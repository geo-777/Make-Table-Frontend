import styles from "./ProfileDropdown.module.css";
import { UserRound, Settings, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
const ProfileDropdown = ({ isOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logout();
  };
  return (
    <div
      className={`${styles.dropdownContainer} ${
        isOpen ? styles.active : styles.inactive
      }`}
    >
      <div className={styles.listItem}>
        <UserRound size={14} />
        My Profile
      </div>
      <div className={styles.listItem} onClick={() => navigate("/settings")}>
        <Settings size={14} />
        Preferences
      </div>
      <div className={styles.listItem} onClick={() => navigate("/helpsupport")}>
        <HelpCircle size={14} />
        Help & Support
      </div>
      <div
        className={`${styles.listItem} ${styles.logoutBtn}`}
        onClick={logoutHandler}
      >
        <LogOut size={16} />
        Logout
      </div>
    </div>
  );
};

export default ProfileDropdown;
