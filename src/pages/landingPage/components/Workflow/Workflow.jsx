import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Workflow.module.css";
import { STEPS } from "../../data/landingData";
import { m } from "framer-motion";
import { easeOut } from "../../utils/animationHelpers";

const Workflow = () => {
  return (
    <section id="how" className={styles.section}>
      <div className={styles.container}>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <div className={styles.heading}>
            <span className={styles.label}>Workflow</span>

            <h2>
              From blank workspace to
              <span> published </span>
              in a single afternoon.
            </h2>
          </div>

          <Link to="/docs" className={styles.link}>
            See the full guide
            <ArrowRight size={14} />
          </Link>
        </m.div>

        <div className={styles.grid}>
          {STEPS.map((step, i) => (
            <m.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: easeOut }}
              className={styles.card}
            >
              <div className={styles.number}>{step.n}</div>

              <h3>{step.t}</h3>

              <p>{step.d}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
