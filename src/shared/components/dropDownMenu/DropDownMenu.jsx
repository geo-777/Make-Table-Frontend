import styles from "./DropDownMenu.module.css";

const DropDownMenu = ({ visible, style, children }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={styles.container}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default DropDownMenu;