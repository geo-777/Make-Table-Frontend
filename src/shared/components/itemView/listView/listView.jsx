import { useMemo, useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import styles from "./listView.module.css";

export default function ListView({ data = [], onEdit, onDelete }) {
  const headings = useMemo(() => {
    if (!data.length) return [];
    return data[0].map((cell) => cell.heading);
  }, [data]);

  const booleanColumns = useMemo(() => {
    if (!data.length) return new Set();
    const cols = new Set();
    headings.forEach((_, colIdx) => {
      const allBool = data.every(
        (row) => typeof row[colIdx]?.value === "boolean",
      );
      if (allBool) cols.add(colIdx);
    });
    return cols;
  }, [data, headings]);

  const colCount = headings.length + 1;

  return (
    <div
      className={styles.listview__Container}
      style={{ gridTemplateColumns: `repeat(${colCount}, auto)` }}
    >
      {headings.map((h, i) => (
        <div key={i} className={styles.listHeading__item}>
          {h}
        </div>
      ))}
      <div className={styles.listHeading__item}>Actions</div>

      {data.map((row, rowIdx) => (
        <Row
          key={rowIdx}
          row={row}
          rowIndex={rowIdx}
          booleanColumns={booleanColumns}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── Row ─────────────────────────── */

function Row({ row, rowIndex, booleanColumns, onEdit, onDelete }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState(row);
  const btnSize = 16;
  const btnStroke = 2;

  const submitEnabled = useMemo(() => {
    return editForm.some((cell, i) => cell.value !== row[i].value);
  }, [editForm, row]);

  const closeEdit = () => {
    setEditForm(row);
    setIsEditMode(false);
  };

  const handleSave = () => {
    onEdit?.(rowIndex, editForm);
    setIsEditMode(false);
  };

  const updateCell = (colIdx, newValue) => {
    setEditForm((prev) =>
      prev.map((cell, i) =>
        i === colIdx ? { ...cell, value: newValue } : cell,
      ),
    );
  };

  if (isEditMode) {
    return (
      <>
        {editForm.map((cell, colIdx) => (
          <div key={colIdx} className={styles.listItem}>
            {booleanColumns.has(colIdx) ? (
              <button
                className={`${styles.badge} ${cell.value ? styles.badge__true : styles.badge__false}`}
                onClick={() => updateCell(colIdx, !cell.value)}
              >
                {cell.value
                  ? (cell.trueLabel ?? "True")
                  : (cell.falseLabel ?? "False")}
              </button>
            ) : (
              <input
                className={styles.inlineInput}
                type={typeof cell.value === "number" ? "number" : "text"}
                value={cell.value}
                onChange={(e) =>
                  updateCell(
                    colIdx,
                    typeof cell.value === "number"
                      ? Number(e.target.value)
                      : e.target.value,
                  )
                }
              />
            )}
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
      {row.map((cell, colIdx) => (
        <div key={colIdx} className={styles.listItem}>
          {booleanColumns.has(colIdx) ? (
            <span
              className={`${styles.badge} ${cell.value ? styles.badge__true : styles.badge__false}`}
            >
              {cell.value
                ? (cell.trueLabel ?? "True")
                : (cell.falseLabel ?? "False")}
            </span>
          ) : (
            cell.value
          )}
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