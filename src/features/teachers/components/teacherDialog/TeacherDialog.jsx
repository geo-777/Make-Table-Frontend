import { useState, useEffect } from "react";
import styles from "./TeacherDialog.module.css";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import { TriangleAlert } from "lucide-react";
const DEFAULT_VALUES = {
  name: "",
  max_classes_day: 4,
  max_classes_week: 18,
  max_classes_consecutive: 3,
};

export default function TeacherDialog({
  open,
  onClose,
  onSubmit,
  teacher = null,
}) {
  const isUpdate = teacher !== null;

  const [form, setForm] = useState(DEFAULT_VALUES);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        isUpdate
          ? {
              name: teacher?.name ?? "",
              max_classes_day:
                teacher?.max_classes_day ?? DEFAULT_VALUES.max_classes_day,
              max_classes_week:
                teacher?.max_classes_week ?? DEFAULT_VALUES.max_classes_week,
              max_classes_consecutive:
                teacher?.max_classes_consecutive ??
                DEFAULT_VALUES.max_classes_consecutive,
            }
          : DEFAULT_VALUES,
      );
    }
  }, [open, teacher, isUpdate]);

  if (!open) return null;

  // --- handlers ---
  function handleChange(e) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    if (error) setError("");
  }

  function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    // Logical validation: max per week must be >= max per day
    if (form.max_classes_week < form.max_classes_day) {
      setError("Max per week cannot be less than max per day.");
      return;
    }

    if (!isUpdate) {
      onSubmit(form);
      return;
    }

    const changedFields = Object.fromEntries(
      Object.entries(form).filter(([key, value]) => value !== teacher[key]),
    );

    if (Object.keys(changedFields).length === 0) {
      onClose();
      return;
    }

    onSubmit({ id: teacher.id, ...changedFields });
  }

  // --- render ---
  return (
    <PopupBox
      visible={open}
      closeFunction={onClose}
      title={isUpdate ? "Update Teacher" : "Add Teacher"}
      primaryBtnText={isUpdate ? "Save Changes" : "Create"}
      handleSubmit={handleSubmit}
      disabled={form.name.length === 0}
    >
      <form
        className={styles.form}
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.field}>
          <label htmlFor="td-name" className={styles.label}>
            Name
          </label>
          <input
            id="td-name"
            name="name"
            type="text"
            className={styles.input}
            placeholder="e.g. Dr. Smith"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className={styles.grid3}>
          <div className={styles.field}>
            <label htmlFor="td-max-day" className={styles.label}>
              Max / day
            </label>
            <input
              id="td-max-day"
              name="max_classes_day"
              type="number"
              className={styles.input}
              min={1}
              value={form.max_classes_day}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="td-max-week" className={styles.label}>
              Max / week
            </label>
            <input
              id="td-max-week"
              name="max_classes_week"
              type="number"
              className={styles.input}
              min={1}
              value={form.max_classes_week}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="td-max-consec" className={styles.label}>
              Max consec.
            </label>
            <input
              id="td-max-consec"
              name="max_classes_consecutive"
              type="number"
              className={styles.input}
              min={1}
              value={form.max_classes_consecutive}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </form>

      {error && (
        <div className={styles.errorBox} role="alert">
          <TriangleAlert size={16} /> <p>{error}</p>
        </div>
      )}
    </PopupBox>
  );
}
