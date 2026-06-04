import styles from "./Features.module.css";
import FeatureCard from "./FeatureCard";
import { FEATURES } from "../../data/landingData";

const Features = () => {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.label}>Product</span>

          <h2>
            Everything you need to ship a timetable.
            <span> Nothing you don't.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
