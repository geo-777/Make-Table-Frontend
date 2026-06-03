import { useMemo, useState } from "react";
import styles from "../styles/Settings.module.css";
import RequiredInputField from "../../../shared/components/inputfields/RequiredInputField";
import { toast } from "react-toastify";
import { changeUsername__PATCH } from "../../../api/settings.api";
import { useAuth } from "../../../app/providers/AuthProvider";

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};

const INITIAL_ERROR_STATE = {
  username: null,
  password: null,
};

const ChangeUsernameSection = () => {
  const { userData, confirmLogin } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const submitEnabled = useMemo(
    () =>
      !isLoading &&
      form?.username?.trim() &&
      form?.username?.trim() !== userData?.username &&
      form?.password?.trim() &&
      form?.password?.length > 0,
    [form, isLoading, userData?.username],
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

    try {
      const response = await changeUsername__PATCH({
        username: form.username,
        password: form.password,
      });

      // Update user context with new username and user data
      if (response?.data) {
        confirmLogin(response.data.username, response.data);
      }

      toast.success("Username updated successfully.");
      resetForm();
    } catch (e) {
      const status = e?.response?.status;
      const errorData = e?.response?.data;

      const errors = { ...INITIAL_ERROR_STATE };

      if (status === 400) {
        if (errorData?.detail?.includes("password")) {
          errors.password = "Incorrect password";
        } else if (errorData?.detail?.includes("username")) {
          errors.username = "Username already taken or invalid";
        } else {
          errors.password = "Invalid credentials";
        }
      } else if (status === 422) {
        if (errorData?.detail?.[0]?.loc?.includes("username")) {
          errors.username = errorData?.detail?.[0]?.msg || "Invalid username";
        }
      } else {
        toast.error(errorData?.detail || "Unknown Error");
      }

      setErrorState(errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="username" className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Username</h2>
          <p className={styles.sectionDesc}>
            Change your username used to sign in.
          </p>
        </div>
      </div>

      <form
        className={styles.inputGrid}
        onSubmit={handleSave}
        disabled={isLoading}
      >
        <RequiredInputField
          id={"new-username-field__settings"}
          type={"text"}
          label={"New Username"}
          placeholder={userData?.username || "Enter new username"}
          value={form.username}
          setValue={(val) => setForm((prev) => ({ ...prev, username: val }))}
          errorState={errorState.username}
          disabled={isLoading}
        />

        <RequiredInputField
          id={"confirm-password-field__settings"}
          type={"password"}
          label={"Password"}
          placeholder={"Enter your password to confirm"}
          value={form.password}
          setValue={(val) => setForm((prev) => ({ ...prev, password: val }))}
          errorState={errorState.password}
          disabled={isLoading}
        />

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
            {isLoading ? "Updating..." : "Update username"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangeUsernameSection;
