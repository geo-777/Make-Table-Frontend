import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
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
    let shouldClose = true;
    try {
      shouldClose = await handleSubmit(e);
    } finally {
      setSubmitLoading(false);
    }
    if (shouldClose) closeFunction();
  };

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;
    // prevents cntrl + enter, shift + enter type combos.. only enter key is allowed
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const tag = e.target?.tagName?.toLowerCase();
    if (tag === "textarea" || e.target?.isContentEditable) return;
    if (tag !== "input") return;
    e.preventDefault();
    handleSubmitClicked(e);
  };

  // todo (optional i guess) : maybe refactor this a bit once the priority stuff are done.
  // maybe use variables instead of hardcoding..
  return createPortal(
    <AnimatePresence>
      {visible && (
        <div className={styles.root} onKeyDown={onKeyDown}>
          <m.div
            className={styles.overlay}
            onClick={closeFunction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <div className={styles.header}>
              <h4 id="popup-title" className={styles.title}>
                {title}
              </h4>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeFunction}
                aria-label="Close"
              >
                <X size={16} strokeWidth={2.25} />
              </button>
            </div>

            <div className={styles.body}>{children}</div>

            <div className={styles.footer}>
              <button
                type="submit"
                className={styles.submitBtn}
                onClick={handleSubmitClicked}
                disabled={submitLoading || disabled}
              >
                {submitLoading ? (
                  <span className={styles.spinner} aria-hidden="true" />
                ) : null}
                {primaryBtnText}
              </button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default PopupBox;
