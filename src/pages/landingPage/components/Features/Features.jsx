import styles from "./Features.module.css";
import FeatureCard from "./FeatureCard";
import { FEATURES } from "../../data/landingData";
import { motion } from "framer-motion";
const Features = () => {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.heading}
        >
          <span className={styles.label}>Product</span>

          <h2>
            Everything you need to ship a timetable.
            <span> Nothing you don't.</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {FEATURES.map((feature, i) => (
            <FeatureCard idx={i} key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
