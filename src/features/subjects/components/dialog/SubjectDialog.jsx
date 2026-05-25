import { useState, useEffect } from "react";
import styles from "./SubjectDialog.module.css";
import {
  X,
  CheckIcon
} from "lucide-react";

export default function SubjectDialog({ 
  open,

  initialData = null,

  onClose, 
  onCreate,
  onUpdate,
}) {

  const mode = initialData ? "edit" : "create";
  const [form, setForm] = useState({
    name: "",
    isLab: false,
    hardness: 5,
    minPerDay: 0,
    maxPerDay: 2,
    minPerWeek: 2,
    maxPerWeek: 5,
    maxConsecutive: 2,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        name: "",
        isLab: false,
        hardness: 5,
        minPerDay: 0,
        maxPerDay: 2,
        minPerWeek: 2,
        maxPerWeek: 5,
        maxConsecutive: 2,
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (mode === "edit") onUpdate?.(form);
    else onCreate?.(form);
    onClose?.();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 id="dialog-title" className={styles.title}>
            {mode === "edit" ? "Edit Subject" : "Add Subject"}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        <div className={styles.body}>
          {/* Basic Info */}
          <section className={styles.section}>
            <span className={styles.sectionLabel}>Basic Info</span>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="subject-name">
                Name
              </label>
              <input
                id="subject-name"
                className={styles.input}
                placeholder="e.g. Mathematics"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className={styles.row}>
              <label className={styles.checkboxLabel}>
                <span
                  role="checkbox"
                  aria-checked={form.isLab}
                  tabIndex={0}
                  className={`${styles.checkbox} ${form.isLab ? styles.checked : ""}`}
                  onClick={() => handleChange("isLab", !form.isLab)}
                  onKeyDown={(e) =>
                    e.key === " " && handleChange("isLab", !form.isLab)
                  }
                >
                  {form.isLab && <CheckIcon strokeWidth={3} />}
                </span>
                Is Lab
              </label>

              <div className={styles.field} style={{ flex: 1 }}>
                <label className={styles.label} htmlFor="hardness">
                  Hardness (1-10)
                </label>
                <div className={styles.hardnessWrapper}>
                  <input
                    id="hardness"
                    type="number"
                    className={styles.input}
                    min={1}
                    max={10}
                    value={form.hardness}
                    onChange={(e) =>
                      handleChange("hardness", Number(e.target.value))
                    }
                  />
                  <div className={styles.hardnessPips}>
                    {Array.from({ length: 10 }, (_, i) => (
                      <span
                        key={i}
                        className={`${styles.pip} ${i < form.hardness ? styles.pipActive : ""}`}
                        style={{ "--i": i }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className={styles.divider} />

          {/* Daily Constraints */}
          <section className={styles.section}>
            <span className={styles.sectionLabel}>Daily Constraints</span>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="min-day">
                  Min classes/day
                </label>
                <input
                  id="min-day"
                  type="number"
                  className={styles.input}
                  min={0}
                  value={form.minPerDay}
                  onChange={(e) =>
                    handleChange("minPerDay", Number(e.target.value))
                  }
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="max-day">
                  Max classes/day
                </label>
                <input
                  id="max-day"
                  type="number"
                  className={styles.input}
                  min={0}
                  value={form.maxPerDay}
                  onChange={(e) =>
                    handleChange("maxPerDay", Number(e.target.value))
                  }
                />
              </div>
            </div>
          </section>

          <div className={styles.divider} />

          {/* Weekly Constraints */}
          <section className={styles.section}>
            <span className={styles.sectionLabel}>Weekly Constraints</span>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="min-week">
                  Min classes/week
                </label>
                <input
                  id="min-week"
                  type="number"
                  className={styles.input}
                  min={0}
                  value={form.minPerWeek}
                  onChange={(e) =>
                    handleChange("minPerWeek", Number(e.target.value))
                  }
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="max-week">
                  Max classes/week
                </label>
                <input
                  id="max-week"
                  type="number"
                  className={styles.input}
                  min={0}
                  value={form.maxPerWeek}
                  onChange={(e) =>
                    handleChange("maxPerWeek", Number(e.target.value))
                  }
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="max-consec">
                Max consecutive
              </label>
              <input
                id="max-consec"
                type="number"
                className={styles.input}
                min={1}
                value={form.maxConsecutive}
                onChange={(e) =>
                  handleChange("maxConsecutive", Number(e.target.value))
                }
              />
            </div>
          </section>

          <button
            className={styles.createBtn}
            onClick={handleSubmit}
            disabled={!form.name.trim()}
          >
            {mode === "edit" ? "Update Subject" : "Create Subject"}
          </button>
        </div>
      </div>
    </div>
  );
}
