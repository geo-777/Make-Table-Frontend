import { Check, X } from "lucide-react";
import styles from "./Compare.module.css";
import { motion } from "framer-motion";
import { easeOut } from "../../LandingPage";
const oldWay = [
  "Hours spent arranging schedules manually",
  "Finding conflicts takes time",
  "Small changes require multiple edits",
  "Timetables are hard to share and update",
  "Spreadsheets become difficult to manage",
];

const makeTable = [
  "Generate timetables automatically",
  "Spot scheduling conflicts early",
  "Update schedules with less effort",
  "Share timetables with a public link",
  "Manage everything in one place",
];

const Compare = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.label}>Why switch</span>

          <h2>
            Less spreadsheet.
            <br />
            More school.
          </h2>
        </motion.div>

        <div className={styles.compareGrid}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className={styles.oldCard}
          >
            <div className={styles.cardLabel}>The old way</div>

            <ul>
              {oldWay.map((item) => (
                <li key={item}>
                  <X size={16} className={styles.x} />
                  <span className={styles.strike}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className={styles.newCard}
          >
            <div className={styles.cardLabel}>With MakeTable</div>

            <ul>
              {makeTable.map((item) => (
                <li key={item}>
                  <Check size={16} className={styles.check} />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Compare;
