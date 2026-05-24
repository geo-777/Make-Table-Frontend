import Topbar from "../../../shared/components/topbar/Topbar";
import "../../../styles/appLayout.css";
import PageHeader from "../../../shared/components/pageHeader/PageHeader";
import ListView from "../../../shared/components/itemView/listView/listView";
import useTimeTableSelect from "../../../shared/zustand/timetableSelectStore";
import { useState } from "react";
import ItemCard from "../../../shared/components/itemView/itemCard/ItemCard";
import styles from "../styles/Subjects.module.css";

const MOCK_SUBJECTS = [
  {
    id: 1,
    name: "Physics",
    type: "theory",
    hardness: 7,
    daily: [0, 2],
    weekly: [3, 5],
    consecutive: 2,
  },

  {
    id: 2,
    name: "CS101",
    type: "lab",
    hardness: 5,
    daily: [0, 1],
    weekly: [2, 3],
    consecutive: 2,
  },

  {
    id: 3,
    name: "English",
    type: "theory",
    hardness: 3,
    daily: [0, 1],
    weekly: [2, 3],
    consecutive: 1,
  },
];

const COLUMNS = [
  {
    key: "name",
    label: "Name",
    render: (value) => value,
  },
  {
    key: "type",
    label: "Type",
    type: "boolean",
    trueLabel: "Lab",
    falseLabel: "Theory",
    render: (value) => (value === "lab" ? "Lab" : "Theory"),
  },
  {
    key: "hardness",
    label: "Hardness",
    render: (value) => `${value}/10`,
  },
  {
    key: "daily",
    label: "Daily",
    render: (value) => value.join("-"),
  },
  {
    key: "weekly",
    label: "Weekly",
    render: (value) => value.join("-"),
  },
  {
    key: "consecutive",
    label: "Consec.",
    render: (value) => value,
  },
];

export default function Subjects () {

  const { selectedTimetableData } = useTimeTableSelect();
  const [activeView, setActiveView] = useState("grid");

  return (
    <div className="App">
      <div className="mainPlaceholder">
        <Topbar page={"Subjects"} />

        <PageHeader
          title={"Subjects"}
          description={
            selectedTimetableData?.name
              ? `Define subject constraints for ${selectedTimetableData.name}`
              : "Select a timetable to define subject constraints."
          }
          addButtonText={"Add Subject"}
          activeView={activeView}
          onChangeActiveView={(view) => setActiveView(view)}
          onAdd={() => {}}
          onBulkImport={() => {}}
        />

        {activeView === "list" && (
          <ListView
            data={MOCK_SUBJECTS}
            columns={COLUMNS}
            onEdit={(rowIndex, updatedRow) => console.log(rowIndex, updatedRow)}
            onDelete={(rowIndex) => console.log("delete", rowIndex)}
          />
        )}

        {activeView === "grid" && (
          <div className={styles.gridView__Container}>
            {MOCK_SUBJECTS.map((sub) => {
              const isLab = sub.type === "lab";
              return (
                <ItemCard key={sub.id}>
                  <div className={styles.card__Header}>
                    <h3 className={styles.card__Title}>{sub.name}</h3>
                  </div>
                  <div className={styles.card__Meta}>
                    <span
                      className={`${styles.card__Badge} ${isLab ? styles.card__Badge__lab : styles.card__Badge__theory}`}
                    >
                      {isLab ? "Lab" : "Theory"}
                    </span>
                    <span className={styles.card__Hardness}>
                      {sub.hardness} hardness
                    </span>
                  </div>
                  <div className={styles.card__Stats}>
                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>
                        {sub.daily.join("-")}
                      </span>
                      <span className={styles.card__StatLabel}>Daily</span>
                    </div>
                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>
                        {sub.weekly.join("-")}
                      </span>
                      <span className={styles.card__StatLabel}>Weekly</span>
                    </div>
                    <div className={styles.card__StatBox}>
                      <span className={styles.card__StatValue}>
                        {sub.consecutive}
                      </span>
                      <span className={styles.card__StatLabel}>Consec.</span>
                    </div>
                  </div>
                </ItemCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

