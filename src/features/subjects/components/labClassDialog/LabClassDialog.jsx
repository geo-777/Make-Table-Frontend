import { useState, useEffect, useRef } from "react";
import { X, Check, Search, FlaskConical } from "lucide-react";
import styles from "./LabClassDialog.module.css";

export default function LabClassDialog({
  isOpen,
  onClose,
  onSave,
  labClasses = [],
  selectedIds = [],
  subjectName = "",
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set(selectedIds));
  const dialogRef = useRef(null);
  const searchRef = useRef(null);
  
  const filteredClasses = labClasses.filter(
    (c) =>
      c.class_name.toLowerCase().includes(search.toLowerCase()) ||
      c.room_name.toLowerCase().includes(search.toLowerCase()),
  );

  const allFilteredSelected =
    filteredClasses.length > 0 &&
    filteredClasses.every((c) => selected.has(c.id));
    
  useEffect(() => {
    if (isOpen) {
      setSelected(new Set(selectedIds));
      setSearch("");
      setTimeout(() => searchRef.current?.focus(), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  const toggleClass = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    const filtered = filteredClasses.map((c) => c.id);
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((id) => next.add(id));
      return next;
    });
  };

  const handleDeselectAll = () => {
    const filtered = filteredClasses.map((c) => c.id);
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((id) => next.delete(id));
      return next;
    });
  };

  const handleSave = () => {
    onSave?.(Array.from(selected));
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      ref={dialogRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Select lab classes for ${subjectName}`}
    >
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <FlaskConical size={18} className={styles.headerIcon} />
            <div>
              <h2 className={styles.title}>Assign Lab Classes</h2>
              {subjectName && <p className={styles.subtitle}>{subjectName}</p>}
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.searchWrapper}>
          <Search size={14} className={styles.searchIcon} />
          <input
            ref={searchRef}
            className={styles.searchInput}
            type="text"
            placeholder="Search by class or room…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.bulkRow}>
          <span className={styles.countLabel}>{selected.size} selected</span>
          <div className={styles.bulkActions}>
            <button
              className={styles.bulkBtn}
              onClick={handleSelectAll}
              disabled={allFilteredSelected}
            >
              Select all
            </button>
            <span className={styles.bulkDivider} />
            <button
              className={styles.bulkBtn}
              onClick={handleDeselectAll}
              disabled={filteredClasses.every((c) => !selected.has(c.id))}
            >
              Deselect all
            </button>
          </div>
        </div>

        <ul
          className={styles.classList}
          role="listbox"
          aria-multiselectable="true"
        >
          {filteredClasses.length === 0 ? (
            <li className={styles.emptyState}>No classes match your search.</li>
          ) : (
            filteredClasses.map((cls) => {
              const isChecked = selected.has(cls.id);
              return (
                <li
                  key={cls.id}
                  className={`${styles.classItem} ${isChecked ? styles.checked : ""}`}
                  onClick={() => toggleClass(cls.id)}
                  role="option"
                  aria-selected={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleClass(cls.id);
                    }
                  }}
                >
                  <span
                    className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ""}`}
                    aria-hidden="true"
                  >
                    {isChecked && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className={styles.classInfo}>
                    <span className={styles.className}>{cls.class_name}</span>
                    <span className={styles.roomName}>{cls.room_name}</span>
                  </span>
                </li>
              );
            })
          )}
        </ul>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
