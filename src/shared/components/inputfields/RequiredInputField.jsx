import styles from "./RequiredInputField.module.css";

import { useEffect, useState } from "react";

const RequiredInputField = ({
  id,
  placeholder,
  type,
  value,
  setValue,
  label,
  errorState,
  min,
}) => {
  const [triggerShake, setTriggerShake] = useState(false);

  useEffect(() => {
    if (errorState) {
      setTriggerShake(false);
      const timer = setTimeout(() => setTriggerShake(true), 0);

      return () => clearTimeout(timer);
    }
  }, [errorState]);
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        <p>{label}</p>
        <p
          className={`${styles.errorLabel} ${errorState ? "" : styles.hidden} `}
        >
          {errorState}
        </p>
      </label>

      <input
        type={type}
        id={id}
        min={min}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${styles.inputField} ${errorState ? styles.errorField : ""} ${triggerShake ? styles.triggerShake : ""}`}
      ></input>
    </div>
  );
};

export default RequiredInputField;
