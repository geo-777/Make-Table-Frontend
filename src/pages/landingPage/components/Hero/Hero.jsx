import { Sparkles, ArrowUpRight, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";
import TimetablePreview from "../TimetablePreview/TimetablePreview";
import useWindowDimensions from "../../../../shared/hooks/useWindowDimensions";
import { m } from "framer-motion";

import { easeOut, fadeUp } from "../../utils/animationHelpers";

const Hero = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  return (
    <main className={styles.hero}>
      <div className={styles.container}>
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className={styles.badgeWrapper}
        >
          <Link to="/docs" className={styles.badge}>
            <Sparkles size={12} />
            <span>v1.0 — now with expanded constraints</span>
            <span className={styles.separator}>•</span>
          </Link>
        </m.div>

        <m.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className={styles.title}
        >
          Timetabling, finally
          <br />
          <span>solved.</span>
        </m.h1>

        <m.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className={styles.description}
        >
          MakeTable is a deterministic scheduling engine for schools. Model your
          constraints once, generate conflict-free timetables in seconds,
          publish in minutes.
        </m.p>

        <m.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className={styles.actions}
        >
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
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className={styles.meta}
        >
          No credit card · MIT licensed · Self-host or use ours
        </m.p>

        {width > 600 && <TimetablePreview />}
      </div>
    </main>
  );
};

export default Hero;
