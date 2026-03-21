import styles from "./RequiredInputField.module.css";
import "../../../styles/theme.css";
import "../../../styles/global.css";
import { User, LockKeyhole, Eye, EyeOff, Mail } from "lucide-react";
import { useEffect, useState } from "react";

/*
Show password icon is only shown if showPassIcon is true because not all password fields require that.
The type of input tag is changed based on that.
showPass state is for internal management.
showPassIcon prop determine if eye icon to be shown or not */

//icon possible values : user, lock
const RequiredInputField = ({
  id,
  placeholder,
  type,
  value,
  setValue,
  label,
  errorState,
  icon,
  showPassIcon,
}) => {
  //icon config
  const iconSize = 16;
  const iconStrokeWidth = 1.75;

  //password config
  const [showPass, setShowPass] = useState(false); // hidden state by default

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

      <div
        className={`${styles.inputField} ${errorState ? styles.errorField : ""} ${triggerShake ? styles.triggerShake : ""}`}
      >
        {/* Possible icons */}
        {icon === "user" && (
          <User size={iconSize} strokeWidth={iconStrokeWidth} />
        )}
        {icon === "pass" && (
          <LockKeyhole size={iconSize} strokeWidth={iconStrokeWidth} />
        )}
        {icon === "mail" && (
          <Mail size={iconSize} strokeWidth={iconStrokeWidth} />
        )}

        <input
          type={showPassIcon && !showPass ? "password" : "text"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {showPassIcon && (
          <span
            onClick={() => setShowPass(!showPass)}
            style={{ cursor: "pointer" }}
          >
            {showPass ? (
              <EyeOff size={iconSize} strokeWidth={iconStrokeWidth} />
            ) : (
              <Eye size={iconSize} strokeWidth={iconStrokeWidth} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default RequiredInputField;
