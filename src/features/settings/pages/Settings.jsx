import "../../../styles/appLayout.css";
import { useState } from "react";
import Topbar from "../../../shared/components/topbar/Topbar";
import styles from "../styles/Settings.module.css";
import ProfileSection from "../components/ProfileSection";
import ChangeUsernameSection from "../components/ChangeUsernameSection";
import PasswordSection from "../components/PasswordSection";
import AppearanceSection from "../components/AppearanceSection";
import DangerZoneSection from "../components/DangerZoneSection";
import SettingsNav from "../components/SettingsNav";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "username", label: "Username" },
  { id: "password", label: "Password" },
  { id: "appearance", label: "Appearance" },
  { id: "danger", label: "Danger zone" },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="App">
      <div className="mainPlaceholder">
        <Topbar page={"Settings"} />
        <div className={`main ${styles.settingsPage}`}>
          <div className={styles.pageHeader}>
            <h4>Settings</h4>
            <p>Manage your account, preferences and appearance.</p>
          </div>
          <div
            className={`stagger-children fast grid-fast-stagger ${styles.pageContent}`}
          >
            <SettingsNav
              tabs={tabs}
              active={activeSection}
              onSelect={(id) => {
                setActiveSection(id);
                const section = document.getElementById(id);
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
            <div className={styles.pageMain}>
              <ProfileSection />
              <ChangeUsernameSection />
              <PasswordSection />
              <AppearanceSection />
              <DangerZoneSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
