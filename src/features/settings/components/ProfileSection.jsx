import styles from "../styles/Settings.module.css";
import { User } from "lucide-react";
import RequiredInputField from "../../../shared/components/inputfields/RequiredInputField";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useMemo } from "react";

const ProfileSection = () => {
  const { userData } = useAuth();
  const joinedAt = useMemo(() => {
    const date = new Date(userData?.created_at);

    if (isNaN(date.getTime())) {
      return "\u2014";
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  }, [userData]);

  return (
    <section id="profile" className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Profile</h2>
          <p className={styles.sectionDesc}>Your profile information.</p>
        </div>
      </div>

      <div className={styles.profileGrid}>
        <RequiredInputField
          id={"username-field__settings"}
          type={"text"}
          label={"Username"}
          placeholder={"johndoe"}
          value={userData?.username || ""}
          disabled={true}
        />
        <RequiredInputField
          id={"email-field__settings"}
          type={"email"}
          label={"Email"}
          placeholder={"email@example.com"}
          value={userData?.email || ""}
          disabled={true}
        />
      </div>
      <div className={styles.joinedAt}>
        <p>Joined</p>
        <span>
          <User size={20} /> <p>{joinedAt}</p>
        </span>
      </div>
    </section>
  );
};

export default ProfileSection;
