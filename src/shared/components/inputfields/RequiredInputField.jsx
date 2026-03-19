import styles from "./RequiredInputField.module.css";
import { User, LockKeyhole, Eye, EyeOff } from "lucide-react";

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
}) => {
  //icon config
  const iconSize = 16;
  const iconStrokeWidth = 1.75;

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        <p>{label}</p>
        <p
          className={`${styles.errorLabel} ${errorState ? "" : styles.hidden}`}
        >
          {errorState}
        </p>
      </label>

      <div
        className={`${styles.inputField} ${errorState ? styles.errorField : ""} `}
      >
        {/* Possible icons */}
        {icon === "user" && (
          <User size={iconSize} strokeWidth={iconStrokeWidth} />
        )}
        {icon === "pass" && (
          <LockKeyhole size={iconSize} strokeWidth={iconStrokeWidth} />
        )}

        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RequiredInputField;
