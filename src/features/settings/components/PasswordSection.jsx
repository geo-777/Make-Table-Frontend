import { useState } from "react";
import { Info } from "lucide-react";
import styles from "../styles/Settings.module.css";
import RequiredInputField from "../../../shared/components/inputfields/RequiredInputField";

const PasswordSection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = (event) => {
    event.preventDefault();
  };

  return (
    <section id="password" className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Password</h2>
          <p className={styles.sectionDesc}>
            Change the password used to sign in.
          </p>
        </div>
      </div>

      <form className={styles.inputGrid} onSubmit={handleSave}>
        <RequiredInputField
          id={"current-password-field__settings"}
          type={"password"}
          label={"Current Password"}
          placeholder={"Example@123"}
          value={newPassword}
          setValue={setNewPassword}
        />
        <div className={styles.profileGrid}>
          <RequiredInputField
            id={"change-password-field__settings"}
            type={"password"}
            label={"New Password"}
            placeholder={"Atleast 8 characters"}
            value={newPassword}
            setValue={setNewPassword}
          />

          <RequiredInputField
            id={"change-password-field__confirm__settings"}
            type={"password"}
            label={"Confirm Password"}
            placeholder={"Enter the same password"}
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </div>

        <div className={styles.cardFooter}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            type="submit"
          >
            Update password
          </button>
        </div>
      </form>
    </section>
  );
};

export default PasswordSection;
