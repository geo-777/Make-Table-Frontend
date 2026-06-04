import styles from "./FeatureCard.module.css";

const FeatureCard = ({ icon: Icon, title, desc }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon size={18} />
      </div>

      <h3>{title}</h3>

      <p>{desc}</p>
    </div>
  );
};

export default FeatureCard;
