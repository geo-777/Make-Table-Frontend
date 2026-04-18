import Loader from "../loader/Loader";
import styles from "./StatusWrapper.module.css";
const StatusWrapper = ({ loader, error, isError, children }) => {
  return (
    <div
      className={`${loader ? styles.loader : styles.error} ${styles.wrapper} `}
    >
      {loader && <Loader />}
      {children}
    </div>
  );
};

export default StatusWrapper;
