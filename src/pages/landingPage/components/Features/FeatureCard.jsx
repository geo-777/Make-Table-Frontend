import styles from "./FeatureCard.module.css";
import { motion } from "framer-motion";
import { easeOut } from "../../utils/animationHelpers";

const FeatureCard = ({ icon: Icon, title, desc, idx: i }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: easeOut }}
      className={styles.card}
    >
      <div className={styles.iconWrapper}>
        <Icon size={18} />
      </div>

      <h3>{title}</h3>

      <p>{desc}</p>
    </motion.div>
  );
};

export default FeatureCard;
