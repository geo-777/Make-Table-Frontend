import { ArrowUpRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./CTA.module.css";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>
          Your next timetable
          <br />
          <span>starts here.</span>
        </h2>

        <p>
          Create a workspace, model your school, generate a schedule. All in one
          sitting.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/register")}
          >
            Get started — it's free
            <ArrowUpRight size={16} />
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/docs")}
          >
            <BookOpen size={15} />
            Read the docs
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
