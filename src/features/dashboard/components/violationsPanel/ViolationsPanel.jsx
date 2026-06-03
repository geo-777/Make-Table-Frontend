import { useState, useMemo } from "react";
import styles from "./ViolationsPanel.module.css";
import {
  TriangleAlert,
  CircleAlert,
  CheckIcon,
} from "lucide-react";

const SEVERE_THRESHOLD = 100_000;

function getCategory(name = "") {
  if (name.startsWith("teacher")) return "Teacher";
  if (name.startsWith("subject")) return "Subject";
  if (name.startsWith("room")) return "Room";
  if (name.startsWith("class")) return "Class";
  return "General";
}

function ViolationItem({ violation }) {
  const isSevere = violation.severity >= SEVERE_THRESHOLD;
  const category = getCategory(violation.name);

  return (
    <div
      className={`${styles.item} ${isSevere ? styles.severe : styles.minor}`}
    >
      {isSevere ? (
        <CircleAlert className={styles.icon} />
      ) : (
        <TriangleAlert className={styles.icon} />
      )}

      <div className={styles.content}>
        <span className={styles.description}>{violation.description}</span>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          {violation.violation_amount > 1 && (
            <span className={styles.amount}>×{violation.violation_amount}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ViolationsPanel({ violations = [] }) {
  const [filter, setFilter] = useState("all");

  const { severeCount, minorCount, filtered } = useMemo(() => {
    const severe = violations.filter((v) => v.severity >= SEVERE_THRESHOLD);
    const minor = violations.filter((v) => v.severity < SEVERE_THRESHOLD);
    const filtered =
      filter === "severe" ? severe : filter === "minor" ? minor : violations;
    return { severeCount: severe.length, minorCount: minor.length, filtered };
  }, [violations, filter]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Violations</span>
        <div className={styles.badge}>
          {severeCount > 0 && (
            <span className={`${styles.badgeCount} ${styles.severe}`}>
              {severeCount} severe
            </span>
          )}
          {minorCount > 0 && (
            <span className={`${styles.badgeCount} ${styles.minor}`}>
              {minorCount} minor
            </span>
          )}
        </div>
      </div>

      <div className={styles.filters}>
        {[
          { key: "all", label: "All", activeClass: styles.activeAll },
          { key: "severe", label: "Severe", activeClass: styles.activeSevere },
          { key: "minor", label: "Minor", activeClass: styles.activeMinor },
        ].map(({ key, label, activeClass }) => (
          <button
            key={key}
            className={`${styles.filterBtn} ${filter === key ? `${styles.active} ${activeClass}` : ""}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <CheckIcon className={styles.emptyIcon} />
            <span className={styles.emptyText}>No violations</span>
          </div>
        ) : (
          filtered.map((v) => <ViolationItem key={v.name} violation={v} />)
        )}
      </div>
    </div>
  );
}