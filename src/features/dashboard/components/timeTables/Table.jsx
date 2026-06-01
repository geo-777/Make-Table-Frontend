import styles from "./Timetable.module.css";

export default function Timetable({
  slotCount,
  entries,
  days,
  colors,
}) {
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
              {entries[day].map((entry, slotIndex) => (
                <td key={slotIndex} className={styles.entryTd}>
                  {entry ? (
                    <div
                      className={`${styles.entryCard} ${styles[colors[entry.subject]]} ${
                        entry.isLab ? styles.labCard : ""
                      }`}
                    >
                      <span className={styles.entryName}>
                        {entry.subject}
                      </span>
                      <span className={styles.entryMeta}>
                        {entry.class} · {entry.teacher}
                      </span>
                    </div>
                  ) : (
                    <div className={styles.emptyCard}>—</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
