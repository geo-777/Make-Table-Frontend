import styles from "../styles/Settings.module.css";
import { User } from "lucide-react";
import RequiredInputField from "../../../shared/components/inputfields/RequiredInputField";
const ProfileSection = () => {
  return (
    <section id="profile" className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Profile</h2>
          <p className={styles.sectionDesc}>
            Your name and email used across MakeTable.
          </p>
        </div>
      </div>

      <div className={styles.profileGrid}>
        <RequiredInputField
          id={"change-password-field__settings"}
          type={"text"}
          label={"Username"}
          placeholder={"johndoe"}
        />

        <RequiredInputField
          id={"change-password-field__confirm__settings"}
          type={"email"}
          label={"Email"}
          placeholder={"example@gmail.com"}
        />
      </div>
      <div className={styles.joinedAt}>
        <p>Joined</p>
        <span>
          <User size={20} /> <p>&#8212;</p>
        </span>
      </div>
      <div className={styles.cardFooter}>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          type="button"
        >
          Discard
        </button>
        <button className={`${styles.btn} ${styles.btnPrimary}`} type="button">
          Save changes
        </button>
      </div>
    </section>
  );
};

export default ProfileSection;
