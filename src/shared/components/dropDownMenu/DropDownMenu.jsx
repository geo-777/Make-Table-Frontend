import styles from "./DropDownMenu.module.css";
const DropDownMenu = ({ visible, top, right, children }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={styles.container}
      style={{
        top: top || 0,
        right: right || 0,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default DropDownMenu;
