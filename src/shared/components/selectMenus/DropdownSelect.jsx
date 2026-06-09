import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./DropdownSelect.module.css";
import { ChevronDown, Check } from "lucide-react";

const DropdownSelect = ({ initialPlaceholder, options, setValue, value }) => {
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    if (selectedOption) setPlaceholder(selectedOption.label);
  }, [value, options]);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;

      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 200;
      const openUpward =
        spaceBelow < dropdownHeight && rect.top > dropdownHeight;

      setDropdownStyle({
        position: "fixed",
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
        ...(openUpward
          ? { bottom: window.innerHeight - rect.top, top: "auto" }
          : { top: rect.bottom + 4, bottom: "auto" }),
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  const dropdown = open && (
    <div
      className={styles.dropdown}
      style={dropdownStyle}
      ref={dropdownRef}
      onMouseDown={(e) => e.preventDefault()}
    >
      <ul className={styles.options}>
        {options.length > 0 ? (
          options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                className={styles.option}
                onClick={() => {
                  setPlaceholder(opt.label);
                  setValue(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check
                    size={16}
                    strokeWidth={2}
                    className={styles.checkIcon}
                  />
                )}
              </li>
            );
          })
        ) : (
          <li className={styles.empty}>No options available</li>
        )}
      </ul>
    </div>
  );

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div
        className={styles.selectContainer}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p>{placeholder}</p>
        <ChevronDown
          className={open ? styles.chevronOpen : styles.chevron}
          size={18}
        />
      </div>
      {createPortal(dropdown, document.body)}
    </div>
  );
};

export default DropdownSelect;