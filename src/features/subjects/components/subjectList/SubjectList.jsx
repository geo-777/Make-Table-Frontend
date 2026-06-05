import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import styles from "./SubjectList.module.css";
import LabClassesTooltip from "../labClassesTooltip/LabClassesTooltip";
import useClasses from "../../../classes/hooks/useClasses";

const HARDNESS_CLASS = { Low: "low", Med: "med", High: "high" };

function HardnessBadge({ value }) {
  const cls = HARDNESS_CLASS[value] ?? "med";
  return (
    <span className={`${styles.hardnessBadge} ${styles[cls]}`}>{value}</span>
  );
}

function RangeDisplay({ min, max }) {
  return (
    <span className={styles.rangeDisplay}>
      {min}
      <span className={styles.rangeSep}>-</span>
      {max}
    </span>
  );
}

function RangeInput({ minVal, maxVal, minField, maxField, onChange }) {
  return (
    <span className={styles.rangeInputGroup}>
      <input
        className={styles.numberInput}
        type="number"
        min={0}
        value={minVal}
        onChange={(e) => onChange(minField, Number(e.target.value))}
      />
      <span className={styles.rangeSep}>-</span>
      <input
        className={styles.numberInput}
        type="number"
        min={0}
        value={maxVal}
        onChange={(e) => onChange(maxField, Number(e.target.value))}
      />
    </span>
  );
}

export default function SubjectList({ subjects = [], onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const { data: classes } = useClasses();

  const labClasses = (classes && typeof classes.filter === "function") ? classes?.filter((c) => c.isLab) : [];

  const handleEditClick = (subject) => {
    setEditingId(subject.id);
    setEditForm({
      name: subject.name,
      isLab: subject.isLab,
      hardness: subject.hardness,
      min_classes_day: subject.min_classes_day,
      max_classes_day: subject.max_classes_day,
      min_classes_week: subject.min_classes_week,
      max_classes_week: subject.max_classes_week,
      min_classes_consecutive: subject.min_classes_consecutive,
      max_classes_consecutive: subject.max_classes_consecutive,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = () => {
    if (onEdit) {
      const subject = subjects.find((s) => s.id === editingId);
      if (!subject) {
        console.error("[SubjectList] Subject not found:", editingId);
        return;
      }
      const changedFields = Object.fromEntries(
        Object.entries(editForm).filter(
          ([key, value]) => value !== subject[key],
        ),
      );
      if (Object.keys(changedFields).length > 0) {
        onEdit({ id: subject.id, ...changedFields });
      }
    }
    setEditingId(null);
    setEditForm({});
  };

  const handleChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`fadeInUp fast ${styles.tableWrapper}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Subject</th>
            <th className={styles.centerTh}>Is Lab</th>
            <th>Hardness</th>
            <th>Per Day</th>
            <th>Per Week</th>
            <th>Consecutive</th>
            <th className={styles.centerTh}>Lab Classes</th>
            <th className={styles.centerTh}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) =>
            editingId === subject.id ? (
              <tr key={subject.id} className={styles.editingRow}>
                <td className={styles.editTd}>
                  <input
                    className={styles.nameInput}
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    autoFocus
                  />
                </td>

                <td className={`${styles.editTd} ${styles.centerTd}`}>
                  <input
                    className={styles.labCheckbox}
                    type="checkbox"
                    checked={!!editForm.isLab}
                    onChange={(e) => handleChange("isLab", e.target.checked)}
                  />
                </td>

                <td className={styles.editTd}>
                  <select
                    className={styles.hardnessSelect}
                    value={editForm.hardness}
                    onChange={(e) => handleChange("hardness", e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Med">Med</option>
                    <option value="High">High</option>
                  </select>
                </td>

                <td className={styles.editTd}>
                  <RangeInput
                    minVal={editForm.min_classes_day}
                    maxVal={editForm.max_classes_day}
                    minField="min_classes_day"
                    maxField="max_classes_day"
                    onChange={handleChange}
                  />
                </td>

                <td className={styles.editTd}>
                  <RangeInput
                    minVal={editForm.min_classes_week}
                    maxVal={editForm.max_classes_week}
                    minField="min_classes_week"
                    maxField="max_classes_week"
                    onChange={handleChange}
                  />
                </td>

                <td className={styles.editTd}>
                  <RangeInput
                    minVal={editForm.min_classes_consecutive}
                    maxVal={editForm.max_classes_consecutive}
                    minField="min_classes_consecutive"
                    maxField="max_classes_consecutive"
                    onChange={handleChange}
                  />
                </td>

                <td className={`${styles.editTd} ${styles.centerTd}`}>
                  <LabClassesTooltip
                    labClasses={subject.lab_classes ?? labClasses.slice(0, 2)}
                  />
                </td>

                <td className={`${styles.editTd} ${styles.actionsCell}`}>
                  <span className={styles.actionsGroup}>
                    <button
                      className={`${styles.actionBtn} ${styles.saveBtn}`}
                      onClick={handleSave}
                      aria-label="Save"
                    >
                      <Check size={15} />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.cancelBtn}`}
                      onClick={handleCancel}
                      aria-label="Cancel"
                    >
                      <X size={15} />
                    </button>
                  </span>
                </td>
              </tr>
            ) : (
              <tr key={subject.id}>
                <td className={styles.nameCell}>{subject.name}</td>

                <td className={styles.centerTd}>
                  {subject.isLab ? (
                    <span className={styles.isLabYes}>Lab</span>
                  ) : (
                    <span className={styles.isLabNo}>Theory</span>
                  )}
                </td>

                <td>
                  <HardnessBadge value={subject.hardness} />
                </td>

                <td>
                  <RangeDisplay
                    min={subject.min_classes_day}
                    max={subject.max_classes_day}
                  />
                </td>

                <td>
                  <RangeDisplay
                    min={subject.min_classes_week}
                    max={subject.max_classes_week}
                  />
                </td>

                <td>
                  <RangeDisplay
                    min={subject.min_classes_consecutive}
                    max={subject.max_classes_consecutive}
                  />
                </td>

                <td className={styles.centerTd}>
                  <LabClassesTooltip
                    labClasses={
                      subject.lab_classes ??
                      labClasses.slice(0, (subject.id % 3) + 1)
                    }
                  />
                </td>

                <td className={styles.actionsCell}>
                  <span className={styles.actionsGroup}>
                    <button
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      onClick={() => handleEditClick(subject)}
                      aria-label={`Edit ${subject.name}`}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => onDelete && onDelete(subject.id)}
                      aria-label={`Delete ${subject.name}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </span>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
