import { useState, useEffect, useRef } from "react";
import styles from "./DropdownSelect.module.css";
import { ChevronDown, Check } from "lucide-react";

const DropdownSelect = ({ initialPlaceholder, options, setValue, value }) => {
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    if (selectedOption) {
      setPlaceholder(selectedOption.label);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      {open && (
        <div className={styles.dropdown}>
          <ul className={styles.options}>
            {options.length > 0 ? (
              options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    className={styles.option}
                    onClick={(e) => {
                      e.stopPropagation();
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
      )}
    </div>
  );
};

export default DropdownSelect;
