import { School, GraduationCap, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Customers.module.css";
import { easeOut } from "../../LandingPage";
const audiences = [
  {
    icon: School,
    title: "Schools",
    description:
      "Create and manage class timetables for teachers and classrooms.",
  },
  {
    icon: GraduationCap,
    title: "Colleges",
    description: "Organize schedules across courses, faculty members and labs.",
  },
  {
    icon: Building2,
    title: "Training institutes",
    description:
      "Plan and share timetables for batches, instructors and classrooms.",
  },
];

const Customers = () => {
  return (
    <section id="customers" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.heading}
        >
          <span className={styles.label}>Built for</span>

          <h2>The people who actually run the schedule.</h2>
        </motion.div>

        <div className={styles.grid}>
          {audiences.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: easeOut }}
                key={item.title}
                className={styles.card}
              >
                <Icon size={20} className={styles.icon} />

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Customers;
