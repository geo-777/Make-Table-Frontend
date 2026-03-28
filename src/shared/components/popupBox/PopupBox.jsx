import styles from "./PopupBox.module.css";
import { X } from "lucide-react";
const PopupBox = ({
  visible,
  closeFunction,
  title,
  primaryBtnText,
  handleSubmit,
  children,
}) => {
  return (
    <div
      className="popupCentered"
      style={{
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        style={{
          pointerEvents: visible ? "auto" : "none",
          opacity: visible ? 0.6 : 0,
        }}
        onClick={closeFunction}
        className="popup_overlay"
      ></div>
      <div
        className={`${styles.popupBox} ${visible ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.headingContainer}>
          <h4>{title}</h4>
          <button type="button">
            <X size={18} onClick={closeFunction} />
          </button>
        </div>
        {children}
        <div className={styles.actionBtns}>
          <button
            type="button"
            className={styles.btnItem}
            onClick={closeFunction}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${styles.btnItem} ${styles.saveBtn}`}
            onClick={handleSubmit}
          >
            {primaryBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupBox;
