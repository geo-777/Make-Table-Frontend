import styles from "./Timetable.module.css";
import {
  Microscope
} from "lucide-react";

function normaliseEntry(entry, mode) {
  if (!entry) return null;
  return {
    id: entry.id,
    slot: entry.slot,
    subjectName: entry.subject.name,
    rgbCode: entry.subject.rgb_code,
    isLab: entry.lab != null,
    role: entry.role,
    meta:
      mode === "teacher"
        ? (entry.class_?.class_name ?? "")
        : (entry.teacher?.name ?? ""),
  };
}

export default function Timetable({
  slotCount,
  entries,
  days,
  mode = "class",
  isLoading = false,
}) {

  if(!entries) return null;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headRow}>
            <th className={styles.dayTh}>Day</th>
            {Array.from({ length: slotCount }, (_, i) => (
              <th key={i} className={styles.slotTh}>
                Slot {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, rowIndex) => (
            <tr
              key={day}
              className={styles.bodyRow}
              style={{ animationDelay: `${rowIndex * 60}ms` }}
            >
              <td className={styles.dayTd}>{day}</td>
              {Array.from({length: slotCount}, (_, slotIndex) => {
                const entry = entries[day]?.find((e) => e.slot === slotIndex + 1);
                return (
                  <td key={slotIndex} className={styles.entryTd}>
                    {entry ? (
                      <EntryCard entry={normaliseEntry(entry, mode)} />
                    ) : (
                      <div className={styles.emptyCard}>-</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EntryCard({ entry }) {
  const { rgbCode, subjectName, meta, isLab, role } = entry;

  const cardStyle = {
    "--entry-color": rgbCode,
    backgroundColor: `color-mix(in srgb, ${rgbCode} 20%, transparent)`,
    border: `1px solid ${rgbCode}`,
    color: `color-mix(in srgb, ${rgbCode} 80%, black)`,
  };

  return (
    <div
      className={`${styles.entryCard} ${isLab ? styles.labCard : ""}`}
      style={cardStyle}
    >
      <span className={styles.entryName}>{subjectName}</span>
      {meta && (
        <span className={styles.entryMeta}>
          {isLab ? <Microscope size={10} /> : ""}{" "}
          {meta}
          {role === "Class_Teacher" ? " · CT" : ""}
        </span>
      )}
    </div>
  );
}