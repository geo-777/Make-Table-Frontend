import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Workflow.module.css";
import { STEPS } from "../../data/landingData";

const Workflow = () => {
  return (
    <section id="how" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
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
        </div>

        <div className={styles.grid}>
          {STEPS.map((step) => (
            <div key={step.n} className={styles.card}>
              <div className={styles.number}>{step.n}</div>

              <h3>{step.t}</h3>

              <p>{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
