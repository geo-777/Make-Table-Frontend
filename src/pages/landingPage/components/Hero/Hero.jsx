import { Sparkles, ArrowUpRight, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";
import TimetablePreview from "../TimetablePreview/TimetablePreview";
import useWindowDimensions from "../../../../shared/hooks/useWindowDimensions";

const Hero = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.badgeWrapper}>
          <Link to="/docs" className={styles.badge}>
            <Sparkles size={12} />
            <span>v1.0 — now with expanded constraints</span>
            <span className={styles.separator}>•</span>
          </Link>
        </div>

        <h1 className={styles.title}>
          Timetabling, finally
          <br />
          <span>solved.</span>
        </h1>

        <p className={styles.description}>
          MakeTable is a deterministic scheduling engine for schools. Model your
          constraints once, generate conflict-free timetables in seconds,
          publish in minutes.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/register")}
          >
            Start free
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

        <p className={styles.meta}>
          No credit card · MIT licensed · Self-host or use ours
        </p>

        {width > 600 && <TimetablePreview />}
      </div>
    </section>
  );
};

export default Hero;
