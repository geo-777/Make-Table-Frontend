import { ArrowUpRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./CTA.module.css";
import { easeOut } from "../../LandingPage";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: easeOut }}
        className={styles.container}
      >
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
      </motion.div>
    </section>
  );
};

export default CTA;
