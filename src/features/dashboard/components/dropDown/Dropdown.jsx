import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";
import {
  CheckIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Dropdown({
  options,
  defaultValue,
  onChange,
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = options.indexOf(selected);
      const next = options[(idx + 1) % options.length];
      setSelected(next);
      onChange?.(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = options.indexOf(selected);
      const prev = options[(idx - 1 + options.length) % options.length];
      setSelected(prev);
      onChange?.(prev);
    }
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        <span className={styles.triggerLabel}>{selected || placeholder}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown/>}
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox" aria-label="Options">
          {options.map((option) => {
            const isSelected = option === selected;
            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
                className={`${styles.item} ${isSelected ? styles.itemSelected : ""}`}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleSelect(option);
                }}
                tabIndex={0}
              >
                <span className={styles.checkIcon}>
                  {isSelected && <CheckIcon />}
                </span>
                <span className={styles.itemLabel}>{option}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
