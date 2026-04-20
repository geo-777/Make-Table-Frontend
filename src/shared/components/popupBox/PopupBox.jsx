import { useEffect, useState } from "react";
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
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmitClicked = async (e) => {
    if (submitLoading) return;
    setSubmitLoading(true);
    try {
      await handleSubmit(e);
    } finally {
      setSubmitLoading(false);
    }

    closeFunction();
  };
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
          opacity: visible ? 0.8 : 0,
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
            className={`${styles.btnItem} ${styles.saveBtn} `}
            onClick={handleSubmitClicked}
            disabled={submitLoading}
          >
            {primaryBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupBox;
