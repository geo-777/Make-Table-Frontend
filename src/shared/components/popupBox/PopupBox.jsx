import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import styles from "./PopupBox.module.css";

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

  return createPortal(
    <div
      className={`${styles.root} ${visible ? styles.rootVisible : ""}`}
      onClick={closeFunction}
    >
      <div className={styles.overlay} aria-hidden="true" />

      <div
        className={`${styles.popupBox} ${visible ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.headingContainer}>
          <h4>{title}</h4>
          <button type="button" onClick={closeFunction} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>{children}</div>

        <div className={styles.action}>
          <button
            type="submit"
            className={`${styles.submitBtn} ${submitLoading ? styles.submitLoading : ""}`}
            onClick={handleSubmitClicked}
            disabled={submitLoading || disabled}
          >
            {submitLoading ? "Saving…" : primaryBtnText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default PopupBox;
