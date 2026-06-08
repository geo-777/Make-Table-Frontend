import { Fragment } from "react";
import styles from "./TimetablePreview.module.css";
import { easeOut } from "../../utils/animationHelpers";

import { motion } from "framer-motion";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5", "Slot 6"];
const DATA = [
  ["Math", "Eng", "Sci", "Hist", "PE"],
  ["Eng", "Math", "Art", "Sci", "Math"],
  ["Sci", "CS", "Math", "Eng", "Mus"],
  ["Hist", "PE", "Eng", "Math", "Art"],
  ["Art", "Sci", "PE", "CS", "Eng"],
  ["CS", "Hist", "Mus", "Art", "Sci"],
];

const TimetablePreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: easeOut }}
      className={styles.wrapper}
    >
      <div className={styles.window}>
        <div className={styles.topbar}>
          <div className={styles.dots}>
            <span />
            <span />
            <span />
          </div>

          <div className={styles.path}>
            <span className={styles.domain}>maketable.app</span>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.cornerCell} />
          {SLOTS.map((slot) => (
            <div key={slot} className={styles.slotHeader}>
              {slot}
            </div>
          ))}

          {DAYS.map((day, dayIndex) => (
            <Fragment key={day}>
              <div className={styles.dayLabel}>{day}</div>
              {DATA.map((slotRow, slotIndex) => {
                const subject = slotRow[dayIndex];
                return (
                  <div
                    key={`${day}-${slotIndex}`}
                    className={`${styles.subject} ${styles[subject.toLowerCase()]}`}
                  >
                    {subject}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TimetablePreview;
