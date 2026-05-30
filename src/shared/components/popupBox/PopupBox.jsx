import { useState } from "react";
import styles from "./PopupBox.module.css";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;
    // prevents cntrl + enter, shift + enter type combos.. only enter key is allowed
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const tag = e.target?.tagName?.toLowerCase();
    if (tag === "textarea") return;
    if (e.target?.isContentEditable) return;
    if (tag != "input") return;
    e.preventDefault();

    handleSubmitClicked(e);
  };

  // todo (optional i guess) : maybe refactor this a bit once the priority stuff are done.
  // maybe use variables instead of hardcoding..
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="popupCentered"
          onKeyDown={onKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <motion.div
            className={styles.popupOverlay}
            onClick={closeFunction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
          <motion.div
            className={styles.popupBox}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupBox;
