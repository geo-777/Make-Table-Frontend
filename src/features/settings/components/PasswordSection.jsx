import { useMemo, useState } from "react";
import styles from "../styles/Settings.module.css";
import RequiredInputField from "../../../shared/components/inputfields/RequiredInputField";
import { passwordRegex } from "../../auth/hooks/useValidate";
import { toast } from "react-toastify";
import { changePassword__PATCH } from "../../../api/settings.api";

const INITIAL_FORM_STATE = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const INITIAL_ERROR_STATE = {
  currentPassword: null,
  newPassword: null,
  confirmPassword: null,
};

const PasswordSection = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const submitEnabled = useMemo(
    () =>
      !isLoading &&
      form?.currentPassword?.trim() &&
      form?.currentPassword?.length > 8 &&
      form?.newPassword?.trim() &&
      form?.confirmPassword?.trim() &&
      form?.confirmPassword === form?.newPassword &&
      form?.newPassword.length >= 8 &&
      form?.newPassword != form?.currentPassword,
    [form, isLoading],
  );

  const resetForm = () => {
    setErrorState(INITIAL_ERROR_STATE);
    setForm(INITIAL_FORM_STATE);
  };

  const handleDiscard = () => {
    resetForm();
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorState(INITIAL_ERROR_STATE);

    if (!passwordRegex.test(form.newPassword)) {
      setErrorState((prev) => ({
        ...prev,
        newPassword: "Include A-Z, a-z, 0-9 & symbol",
        confirmPassword: "Include A-Z, a-z, 0-9 & symbol",
      }));
      setIsLoading(false);
      return;
    }

    try {
      await changePassword__PATCH({
        current_password: form.currentPassword,
        new_password: form.newPassword,
        confirm_new_password: form.confirmPassword,
      });
      toast.success("Password updated successfully.");
      resetForm();
    } catch (e) {
      const status = e?.response?.status;
      console.log(status, e?.response);

      const errors = INITIAL_ERROR_STATE;

      if (status === 400) {
        errors.currentPassword = "Incorrect Password";
      } else {
        toast.error("Unknown Error");
      }

      setErrorState(errors);
    } finally {
      setIsLoading(false);
    }
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

      <form
        className={styles.inputGrid}
        onSubmit={handleSave}
        disabled={isLoading}
      >
        <RequiredInputField
          id={"current-password-field__settings"}
          type={"password"}
          label={"Current Password"}
          placeholder={"Example@123"}
          value={form.currentPassword}
          setValue={(val) =>
            setForm((prev) => ({ ...prev, currentPassword: val }))
          }
          errorState={errorState.currentPassword}
          disabled={isLoading}
        />
        <div className={styles.profileGrid}>
          <RequiredInputField
            id={"change-password-field__settings"}
            type={"password"}
            label={"New Password"}
            placeholder={"Atleast 8 characters"}
            value={form.newPassword}
            setValue={(val) =>
              setForm((prev) => ({ ...prev, newPassword: val }))
            }
            errorState={errorState.newPassword}
            disabled={isLoading}
          />

          <RequiredInputField
            id={"change-password-field__confirm__settings"}
            type={"password"}
            label={"Confirm Password"}
            placeholder={"Enter the same password"}
            value={form.confirmPassword}
            setValue={(val) =>
              setForm((prev) => ({ ...prev, confirmPassword: val }))
            }
            errorState={errorState.confirmPassword}
            disabled={isLoading}
          />
        </div>

        <div className={styles.cardFooter}>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            type="reset"
            onClick={handleDiscard}
            disabled={isLoading}
          >
            Discard
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            type="submit"
            disabled={!submitEnabled}
          >
            {isLoading ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PasswordSection;
