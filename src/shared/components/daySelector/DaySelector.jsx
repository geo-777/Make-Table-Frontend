import styles from "./DaySelector.module.css";
import CircularCheckBox from "../specialButtons/CircularCheckBox";

const DEFAULT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DaySelector = ({
  selectedDays,
  toggleDay,
  days = DEFAULT_DAYS,
  label,
  errorMessage,
}) => {
  return (
    <div className={styles.daySelector}>
      {label && (
        <div className={styles.labelRow}>
          <span className={styles.label}>{label}</span>
          {errorMessage ? (
            <span className={styles.error}>{errorMessage}</span>
          ) : null}
        </div>
      )}
      <div className={styles.dayGrid}>
        {days.map((day) => {
          const active = selectedDays.includes(day);
          return (
            <button
              key={day}
              type="button"
              className={`${styles.dayItem} ${active ? styles.active : ""}`}
              onClick={() => toggleDay(day)}
              aria-pressed={active}
            >
              <CircularCheckBox
                checked={active}
                checkSize={11}
                checkStroke={2}
              />
              <span className={styles.dayText}>{day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector;
