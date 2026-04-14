import styles from "./DropDownMenu.module.css";
const DropDownMenu = ({ visible, top, right, children, closeMenu }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={styles.container}
      style={{
        top: top || 0,
        right: right || 0,
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default DropDownMenu;
