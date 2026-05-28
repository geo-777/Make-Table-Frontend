import { useState, useEffect, useRef } from "react";
import styles from "./SearchableSelect.module.css";
import { ChevronDown, Search, Check } from "lucide-react";
/*Made it reusable.. might need this some other time too
This was mainly built for the teacher class assigment section

Options format : 
{
  label: "7A",
  value: 7 <- this here will be the class id
}
  */
const SearchableSelect = ({ initialPlaceholder, options, setValue, value }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const wrapperRef = useRef(null);
  const searchInputRef = useRef(null);

  // Update placeholder when value changes externally
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

  //resetting query on close + auto focus on search input
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    } else {
      searchInputRef.current?.focus();
    }
  }, [open]);

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
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlaceholder(opt.label);
                      setOpen(false);
                      setValue(opt.value);
                    }}
                    key={opt.value}
                    className={styles.option}
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
            ).length === 0 && (
              <li className={styles.empty}>No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
