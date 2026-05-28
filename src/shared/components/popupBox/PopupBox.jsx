import { useState } from "react";
import styles from "./PopupBox.module.css";
import { X } from "lucide-react";
const PopupBox = ({
  visible,
  closeFunction,
  title,
  primaryBtnText,
  handleSubmit,
  children,
  disabled = false,
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmitClicked = async (e) => {
    if (submitLoading) return;
    setSubmitLoading(true);
    let invokeCloseFunction = true;
    try {
      invokeCloseFunction = await handleSubmit(e);
    } finally {
      setSubmitLoading(false);
    }

    if (invokeCloseFunction) closeFunction();
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
          <button type="button" onClick={closeFunction}>
            <X size={18} />
          </button>
        </div>
        {children}
        <button
          type="submit"
          className={` ${styles.submitBtn} `}
          onClick={handleSubmitClicked}
          disabled={submitLoading || disabled}
        >
          {primaryBtnText}
        </button>
      </div>
    </div>
  );
};

export default PopupBox;
