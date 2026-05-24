import { useMemo, useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import styles from "./listView.module.css";

export default function ListView({
  data = [],
  columns = [],
  onEdit,
  onDelete,
}) {
  return (
    <div
      className={styles.listview__Container}
      style={{ gridTemplateColumns: `repeat(${columns.length + 1}, auto)` }}
    >
      {columns.map((col) => (
        <div key={col.key} className={styles.listHeading__item}>
          {col.label}
        </div>
      ))}
      <div className={styles.listHeading__item}>Actions</div>

      {data.map((row, rowIdx) => (
        <Row
          key={row.id ?? rowIdx}
          row={row}
          rowIndex={rowIdx}
          columns={columns}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── Row ─────────────────────────── */

function Row({ row, rowIndex, columns, onEdit, onDelete }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState(row);
  const btnSize = 16;
  const btnStroke = 2;

  const submitEnabled = useMemo(() => {
    return columns.some((col) => editForm[col.key] !== row[col.key]);
  }, [editForm, row, columns]);

  const closeEdit = () => {
    setEditForm(row);
    setIsEditMode(false);
  };

  const handleSave = () => {
    onEdit?.(rowIndex, editForm);
    setIsEditMode(false);
  };

  const updateField = (key, newValue) => {
    setEditForm((prev) => ({ ...prev, [key]: newValue }));
  };

  if (isEditMode) {
    return (
      <>
        {columns.map((col) => (
          <div key={col.key} className={styles.listItem}>
            <EditCell
              col={col}
              value={editForm[col.key]}
              onChange={(newValue) => updateField(col.key, newValue)}
            />
          </div>
        ))}
        <div className={`${styles.listItem} ${styles.listItem__actionBtns}`}>
          <button
            className={`${styles.actionBtn__list} ${styles.actionBtn__delete}`}
            onClick={closeEdit}
          >
            <X size={btnSize} strokeWidth={btnStroke} />
          </button>
          <button
            disabled={!submitEnabled}
            onClick={handleSave}
            className={`${styles.actionBtn__list} ${styles.actionBtn__tick}`}
          >
            <Check size={btnSize} strokeWidth={btnStroke} />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {columns.map((col) => (
        <div key={col.key} className={styles.listItem}>
          <CellValue col={col} value={row[col.key]} />
        </div>
      ))}
      <div className={`${styles.listItem} ${styles.listItem__actionBtns}`}>
        <button
          className={styles.actionBtn__list}
          onClick={() => setIsEditMode(true)}
        >
          <Pencil size={btnSize} strokeWidth={btnStroke} />
        </button>
        <button
          className={`${styles.actionBtn__list} ${styles.actionBtn__delete}`}
          onClick={() => onDelete?.(rowIndex)}
        >
          <Trash2 size={btnSize} strokeWidth={btnStroke} />
        </button>
      </div>
    </>
  );
}

/* ─────────────────────────── CellValue ─────────────────────────── */

function CellValue({ col, value }) {
  if (col.type === "boolean") {
    return (
      <span
        className={`${styles.badge} ${value.toLowerCase() === col.trueLabel.toLowerCase() ? styles.badge__true : styles.badge__false}`}
      >
        {value.toLowerCase() === col.trueLabel.toLowerCase() ? col.trueLabel : col.falseLabel}
      </span>
    );
  }

  return col.render ? col.render(value) : value;
}

/* ─────────────────────────── EditCell ─────────────────────────── */

function EditCell({ col, value, onChange }) {
  if (col.type === "boolean") {
    return (
      <button
        className={`${styles.badge} ${value ? styles.badge__true : styles.badge__false}`}
        onClick={() => onChange(!value)}
      >
        {value ? (col.trueLabel ?? "True") : (col.falseLabel ?? "False")}
      </button>
    );
  }

  if (Array.isArray(value)) {
    return (
      <input
        className={styles.inlineInput}
        type="text"
        value={value.join(",")}
        onChange={(e) => {
          const raw = e.target.value.split(",").map((v) => {
            const n = Number(v.trim());
            return isNaN(n) ? v.trim() : n;
          });
          onChange(raw);
        }}
      />
    );
  }

  return (
    <input
      className={styles.inlineInput}
      type={typeof value === "number" ? "number" : "text"}
      value={value}
      onChange={(e) =>
        onChange(
          typeof value === "number" ? Number(e.target.value) : e.target.value,
        )
      }
    />
  );
}
