import styles from "./ProfileDropdown.module.css";
import { UserRound, Settings, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "../dropDownMenu/DropDownMenu";

const ProfileDropdown = ({ isOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <DropDownMenu visible={isOpen}>
      <div className={styles.listItem} onClick={() => navigate("/myprofile")}>
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
        onClick={logout}
      >
        <LogOut size={16} />
        Logout
      </div>
    </DropDownMenu>
  );
};

export default ProfileDropdown;