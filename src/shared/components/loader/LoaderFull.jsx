import Loader from "./Loader";
import styles from "./Loader.module.css";
const LoaderFull = () => {
  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
};

export default LoaderFull;
