import { School, GraduationCap, Building2 } from "lucide-react";

import styles from "./Customers.module.css";

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
        <div className={styles.heading}>
          <span className={styles.label}>Built for</span>

          <h2>The people who actually run the schedule.</h2>
        </div>

        <div className={styles.grid}>
          {audiences.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className={styles.card}>
                <Icon size={20} className={styles.icon} />

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Customers;
