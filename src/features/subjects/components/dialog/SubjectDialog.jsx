import { useState, useEffect } from "react";
import styles from "./SubjectDialog.module.css";
import { CheckIcon, FlaskConical, ChevronRight, X } from "lucide-react";
import PopupBox from "../../../../shared/components/popupBox/PopupBox";
import LabClassDialog from "../labClassDialog/LabClassDialog";
import useClasses from "../../../classes/hooks/useClasses";

/*
  NEW SCHEMA

  {
    id: number,
    name: string,
    created_at: "2026-05-28T10:43:09.890Z",
    isLab: boolean,
    hardness: "Low" | "Med" | "High",
    min_classes_day: number,
    max_classes_day: number,
    min_classes_week: number,
    max_classes_week: number,
    min_classes_consecutive: number,
    max_classes_consecutive: number,
    lab_classes: [
      0, 1, 2
    ]
  }
*/

const EMPTY_FORM = {
  name: "",
  isLab: false,
  hardness: "Low",
  min_classes_day: 1,
  max_classes_day: 2,
  min_classes_week: 2,
  max_classes_week: 5,
  min_classes_consecutive: 1,
  max_classes_consecutive: 2,
  lab_classes: [],
};

export default function SubjectDialog({
  open,
  initialData = null,
  onClose,
  onCreate,
  onUpdate,
}) {
  const mode = initialData ? "edit" : "create";
  const [form, setForm] = useState(EMPTY_FORM);
  const [labDialogOpen, setLabDialogOpen] = useState(false);

  const { data: classes } = useClasses();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    if(mode !== "edit") {
      const payload = {...form, lab_classes: form.lab_classes.map((c) => c.id)}

      onCreate?.(payload);
      onClose?.();
      return;
    }

    let changedFields = Object.fromEntries(
      Object.entries(form).filter(([key, value]) => value !== initialData[key]),
    );

    if (Object.keys(changedFields).length > 0) {
      changedFields = changedFields.lab_classes
        ? {
            ...changedFields,
            lab_classes: changedFields.lab_classes.map((c) => c.id),
          }
        : changedFields;
        
      onUpdate({id: initialData.id, ...changedFields});
    }
    
    onClose();
  };

  const handleLabClassesSave = (selectedIds) => {
    const selected = classes.data.filter((c) => selectedIds.includes(c.id));
    handleChange("lab_classes", selected);
  };

  const removeLabClass = (id) => {
    handleChange(
      "lab_classes",
      form.lab_classes.filter((c) => c.id !== id),
    );
  };

  const popupDetail =
    mode === "edit"
      ? { title: "Edit Subject", primary: "Update" }
      : { title: "Add Subject", primary: "Create" };

  const HARDNESS = ["Low", "Med", "High"];

  return (
    <>
      <PopupBox
        visible={open}
        closeFunction={onClose}
        title={popupDetail.title}
        primaryBtnText={popupDetail.primary}
        handleSubmit={handleSubmit}
        disabled={!form.name.trim()}
      >
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
                onKeyDown={(e) => {
                  e.key === " " && handleChange("isLab", !form.isLab);
                }}
              >
                {form.isLab && <CheckIcon strokeWidth={3} />}
              </span>
              Is Lab
            </label>

            <div className={styles.field} style={{ flex: 1 }}>
              <label className={styles.label} htmlFor="hardness">
                Hardness
              </label>
              <div className={styles.hardnessWrapper}>
                {HARDNESS.map((h) => (
                  <button
                    key={h}
                    className={`${styles.hardness} ${form.hardness === h ? styles.selected : ""}`}
                    title={h}
                    onClick={() => handleChange("hardness", h)}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={styles.divider} />

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
                value={form.min_classes_day}
                onChange={(e) =>
                  handleChange("min_classes_day", Number(e.target.value))
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
                value={form.max_classes_day}
                onChange={(e) =>
                  handleChange("max_classes_day", Number(e.target.value))
                }
              />
            </div>
          </div>
        </section>

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
                value={form.min_classes_week}
                onChange={(e) =>
                  handleChange("min_classes_week", Number(e.target.value))
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
                value={form.max_classes_week}
                onChange={(e) =>
                  handleChange("max_classes_week", Number(e.target.value))
                }
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionLabel}>Consecutive Constraints</span>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="min-consec">
                Min Consec.
              </label>
              <input
                id="min-consec"
                type="number"
                className={styles.input}
                min={0}
                value={form.min_classes_consecutive}
                onChange={(e) =>
                  handleChange(
                    "min_classes_consecutive",
                    Number(e.target.value),
                  )
                }
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="max-consec">
                Max Consec.
              </label>
              <input
                id="max-consec"
                type="number"
                className={styles.input}
                min={0}
                value={form.max_classes_consecutive}
                onChange={(e) =>
                  handleChange(
                    "max_classes_consecutive",
                    Number(e.target.value),
                  )
                }
              />
            </div>
          </div>
        </section>

        {form.isLab && (
          <>
            <div className={styles.divider} />

            <section className={styles.section}>
              <div className={styles.labClassesHeader}>
                <span className={styles.sectionLabel}>Lab Classes</span>
                <button
                  className={styles.assignBtn}
                  onClick={() => setLabDialogOpen(true)}
                >
                  <FlaskConical size={13} />
                  Assign classes
                  <ChevronRight size={13} />
                </button>
              </div>

              {form.lab_classes.length === 0 ? (
                <p className={styles.labClassesEmpty}>
                  No classes assigned yet.
                </p>
              ) : (
                <ul className={styles.labClassesList}>
                  {form.lab_classes.map((cls) => (
                    <li key={cls.id} className={styles.labClassChip}>
                      <span className={styles.labClassChipName}>
                        {cls.class_name}
                      </span>
                      <span className={styles.labClassChipRoom}>
                        {cls.room_name}
                      </span>
                      <button
                        className={styles.labClassChipRemove}
                        onClick={() => removeLabClass(cls.id)}
                        aria-label={`Remove ${cls.class_name}`}
                      >
                        <X size={11} strokeWidth={2.5} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </PopupBox>

      <LabClassDialog
        isOpen={labDialogOpen}
        onClose={() => setLabDialogOpen(false)}
        onSave={handleLabClassesSave}
        labClasses={classes.data.filter((c) => c.isLab)}
        selectedIds={form.lab_classes.map((c) => c.id)}
        subjectName={form.name}
      />
    </>
  );
}
