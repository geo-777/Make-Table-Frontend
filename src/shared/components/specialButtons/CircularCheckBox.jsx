import styles from "./specialBtnStyles.module.css";
import { Check } from "lucide-react";
const CircularCheckBox = ({ checked, toggleCheck }) => {
  return (
    <span
      className={`${styles.CircularCheckBox} ${checked ? styles.circularcb__checked : ""}`}
      onClick={toggleCheck}
    >
      {checked && <Check size={14} strokeWidth={2.5} />}
    </span>
  );
};

export default CircularCheckBox;
