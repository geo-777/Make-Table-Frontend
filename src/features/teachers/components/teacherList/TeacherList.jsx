import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import styles from "./TeacherList.module.css";

const EditRow = ({
  editForm,
  handleChange,
  handleSave,
  handleCancel,
}) => {
  return (
    <tr className={styles.editingRow}>
      <td>
        <input
          className={styles.nameInput}
          type="text"
          value={editForm.name}
          onChange={(e) => handleChange("name", e.target.value)}
          autoFocus
        />
      </td>
      <td>
        <input
          className={styles.numberInput}
          type="number"
          value={editForm.max_classes_day}
          onChange={(e) => handleChange("max_classes_day", e.target.value)}
          min={1}
        />
      </td>
      <td>
        <input
          className={styles.numberInput}
          type="number"
          value={editForm.max_classes_week}
          onChange={(e) => handleChange("max_classes_week", e.target.value)}
          min={1}
        />
      </td>
      <td>
        <input
          className={styles.numberInput}
          type="number"
          value={editForm.max_classes_consecutive}
          onChange={(e) =>
            handleChange("max_classes_consecutive", e.target.value)
          }
          min={1}
        />
      </td>
      <td className={styles.actionsCell}>
        <button
          className={`${styles.actionBtn} ${styles.saveBtn}`}
          onClick={handleSave}
          aria-label="Save"
        >
          <Check size={16} />
        </button>
        <button
          className={`${styles.actionBtn} ${styles.cancelBtn}`}
          onClick={handleCancel}
          aria-label="Cancel"
        >
          <X size={16} />
        </button>
      </td>
    </tr>
  );
};

const TeacherRow = ({ teacher, handleEditClick, onDelete }) => {
  return (
    <tr>
      <td className={styles.nameCell}>{teacher.name}</td>
      <td>{teacher.max_classes_day}</td>
      <td>{teacher.max_classes_week}</td>
      <td>{teacher.max_classes_consecutive}</td>
      <td className={styles.actionsCell}>
        <button
          className={`${styles.actionBtn} ${styles.editBtn}`}
          onClick={() => handleEditClick(teacher)}
          aria-label={`Edit ${teacher.name}`}
        >
          <Pencil size={14} />
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete && onDelete(teacher.id)}
          aria-label={`Delete ${teacher.name}`}
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
};

export default function TeacherList({ teachers = [], onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEditClick = (teacher) => {
    setEditingId(teacher.id);
    setEditForm({
      name: teacher.name,
      max_classes_day: teacher.max_classes_day,
      max_classes_week: teacher.max_classes_week,
      max_classes_consecutive: teacher.max_classes_consecutive,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = () => {
    if (onEdit) {
      const teacher = teachers.find((t) => t.id === editingId);
      if (!teacher) {
        console.error("[TeacherList: 28] Teacher not found.");
        return;
      }
      const changedFields = Object.fromEntries(
        Object.entries(editForm).filter(
          ([key, value]) => value !== teacher[key],
        ),
      );

      if (Object.keys(changedFields).length === 0) return;

      onEdit({ id: teacher.id, ...changedFields });
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
            <th>Name</th>
            <th>Max/Day</th>
            <th>Max/Week</th>
            <th>Max Consec.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {teachers.map((teacher) =>
            editingId === teacher.id ? (
              <EditRow 
                key={teacher.id}
                editForm={editForm}
                handleChange={handleChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            ) : (
              <TeacherRow 
                key={teacher.id}
                teacher={teacher}
                handleEditClick={handleEditClick}
                onDelete={onDelete}
              />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
