import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./SearchableSelect.module.css";
import { ChevronDown, Search, Check } from "lucide-react";

const SearchableSelect = ({ initialPlaceholder, options, setValue, value }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const wrapperRef = useRef(null);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const updatePosition = () => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 260;
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

  useEffect(() => {
    const selectedOption = options?.find((opt) => opt.value === value);
    setPlaceholder(selectedOption ? selectedOption.label : initialPlaceholder);
  }, [value, options, initialPlaceholder]);

  useEffect(() => {
    if (!open) return;

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

  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    } else {
      searchInputRef.current?.focus();
    }
  }, [open]);

  const dropdown = open && (
    <div className={styles.dropdown} style={dropdownStyle} ref={dropdownRef} onMouseDown={(e) => e.preventDefault()}>
      <div className={styles.inputField}>
        <Search size={16} strokeWidth={1.75} />
        <input
          ref={searchInputRef}
          value={searchQuery}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>
      <ul className={styles.options}>
        {options
          .filter((opt) =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                className={styles.option}
                onClick={(e) => {
                  e.stopPropagation();
                  setPlaceholder(opt.label);
                  setOpen(false);
                  setValue(opt.value);
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
          })}
        {options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
        ).length === 0 && <li className={styles.empty}>No results found</li>}
      </ul>
    </div>
  );

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div
        className={styles.selectContainer}
        onClick={() => { 
          if(!open) updatePosition();
          setOpen((prev) => !prev);
        }}
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

export default SearchableSelect;