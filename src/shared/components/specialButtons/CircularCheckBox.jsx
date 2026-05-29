import styles from "./specialBtnStyles.module.css";
import { Check } from "lucide-react";
const CircularCheckBox = ({
  checked,
  toggleCheck,
  style,
  checkSize = 10,
  checkStroke = 2.2,
}) => {
  return (
    <span
      style={style}
      className={`${styles.CircularCheckBox} ${checked ? styles.circularcb__checked : ""}`}
      onClick={toggleCheck}
    >
      {checked && <Check size={checkSize} strokeWidth={checkStroke} />}
    </span>
  );
};

export default CircularCheckBox;
